<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Exceptions\CartException;
use App\Exceptions\TooManyPurchasesException;
use App\Services\PriceService;
use App\Product;
use App\Category;
use App\Service;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderShipped;
use App\Mail\OrderCustomerShipped;

class CartService
{
	protected $request;
	
    protected $priceService;	
	
	public $product;
	
	public $service;
	
    /**
     * Ключ массива сессии с товарами ('products' или 'order')
     *
     * @var string
     */	
	protected $productsData = 'products';
	
	public function __construct(Request $request, PriceService $priceService, Product $product, Service $service) {
		$this->priceService = $priceService;
		$this->request = $request;
		$this->product = $product;
		$this->service = $service;
	}
	
    /**
     * Устанавливает количество товара, которое есть в наличии
     *
     * @param  \Add\Product  $product
     */		
	protected function productStock(Product $product) {
		$session = $this->request->session();
		$session->put("{$this->productsData}.{$product->id}", ['id' => $product->id, 'quantity' => $product->product_stock->quantity]);
		if ($product->product_stock->quantity === 0) $session->forget("{$this->productsData}.{$product->id}");		
	}

    /**
     * Добавляет товар в массив сессии с ключом 'products' (Добавляет в корзину)
     *
	 * @return string строка json с объектом товара
     */			
    public function add() {
		$id = $this->request->input('id');
		$quantity = (int) $this->request->input('quantity');
		$categories = Category::select('id', 'parent_id')->get()->keyBy('id');
		
		$this->product = $this->product->select('name', 'unit_id', 'category_id', 'id')->with([
				'price.price_history' => function ($query) {
					$query->select('price', 'product_id', 'id');
				},
				'product_images' => function ($query) {
					$query->select('name', 'product_id')->first();
				},
				'category' => function($query) {
					$query->select('id', 'parent_id', 'published')->withoutGlobalScope('published');
				},
				'unit' => function($query) {
					$query->select('id', 'reduction');
				},
				'product_characteristics' => function($query) {
					$query->where('characteristic_id', 69)->get();
				},
				'product_stock',
				'promotional_product'
			])->findOrFail($id);
		// Если добавлено больше, чем есть в наличии
		if ($quantity > $this->product->product_stock->quantity) $quantity = $this->product->product_stock->quantity;
		
		if ($quantity === 0) {
			$this->request->session()->forget("products.$id");
		}
		else {
			$this->request->session()->put("products.$id", ['id' => $id, 'quantity' => $quantity]);
			
			$this->product->setAttribute('quantity', $quantity);
			
			if ( $this->priceService->isDiscountCategory($categories, $this->product->category) ) {
				$this->product = $this->priceService->areaDiscount($this->product, 10);
			}	
			
			if ($this->product->promotional_product) {
				$this->product = $this->priceService->areaDiscount($this->product, $this->product->promotional_product->discount);
			}			
		}	
		
		return $this->product->toJson();
	}
	
    /**
     * Добавляет услугу в массив сессии с ключом 'services' (Добавляет в корзину)
     *
	 * @return string строка json с объектом услуги
     */			
    public function addService() {
		$id = $this->request->input('id');
		$quantity = (int) $this->request->input('quantity');
		
		$this->service = $this->service->select('name', 'id')->with([
			'service_price.service_price_history' => function ($query) {
				$query->select('price', 'service_id', 'id');
			},
			'service_unit.unit' => function($query) {
				$query->select('id', 'reduction');
			}			
		])->findOrFail($id);
		
		if ($quantity === 0) {
			$this->request->session()->forget("services.$id");
		}
		else {
			$this->request->session()->put("services.$id", ['id' => $id, 'quantity' => $quantity]);
		}	
		
		$this->service->setAttribute('quantity', $quantity);
		
		$serviceIds = array_keys( $this->request->session()->get('services') );
		$services = $this->getCartServices($serviceIds);
		$service_sum = $this->priceService->getServiceSum($services);
		
		return collect(['service' => $this->service, 'service_sum' => $service_sum])->toJson();
	}	
	
	
	protected function getCartProducts($productIds) {
		return $this->getProductModels($this->request->session()->get('products'), $productIds);
	}
	
	protected function getCartServices($serviceIds) {
		return $this->getServiceModels($this->request->session()->get('services'), $serviceIds);
	}	
	/** 
	* Возвращает коллекцию моделей товаров с атрибутом quantity
	* Если товар ламинат, то при определенной площади добавляет скидку
	* 
	* @param array $productStorage хранилеще товаров отсортированное по ключу	
	* @param array $productIds id товаров
    * @return \Illuminate\Database\Eloquent\Collection
	*/
	protected function getProductModels($productStorage, $productIds) {	
		$products = $this->product->select('name', 'unit_id', 'category_id', 'id')->with([
			'price.price_history' => function ($query) {
				$query->select('price', 'product_id', 'id');
			},
			'product_images' => function ($query) {
				$query->select('name', 'product_id')->where('level', 0);
			},
			'category' => function($query) {
				$query->select('name', 'id', 'parent_id', 'published')->withoutGlobalScope('published');
			},
			'unit' => function($query) {
				$query->select('id', 'reduction');
			},
			'product_characteristics' => function($query) {
				$query->where('characteristic_id', 69)->get();
			},
			'product_stock',
			'promotional_product'
		])->orderByRaw(DB::raw('FIELD(id,'.implode(',', array_fill(0, count($productIds), '?')).')'), $productIds)
		->find($productIds);
		
		$categories = Category::select('id', 'parent_id')->get()->keyBy('id');
		
		foreach ($products as $product) {
			$product->setAttribute('quantity', $productStorage[$product->id]['quantity']);
			
			if ( $this->priceService->isDiscountCategory($categories, $product->category) ) {
				$product = $this->priceService->areaDiscount($product, 10);
			}
			
			if ($product->promotional_product) {
				$product = $this->priceService->areaDiscount($product, $product->promotional_product->discount);
			}
			
		}		
		
		return $products;
	}

	/** 
	* Возвращает коллекцию моделей услуг с атрибутом quantity
	* 
	* @param array $serviceStorage хранилеще услуг отсортированное по ключу		
	* @param $serviceIds id услуг
    * @return \Illuminate\Database\Eloquent\Collection
	*/	
	protected function getServiceModels($serviceStorage, $serviceIds) {	
		$services = $this->service->select('name', 'id')->with([
			'service_price.service_price_history' => function ($query) {
				$query->select('price', 'service_id', 'id');
			},
			'service_unit.unit' => function($query) {
				$query->select('id', 'reduction');
			}				
		])->orderByRaw(DB::raw('FIELD(id,'.implode(',', array_fill(0, count($serviceIds), '?')).')'), $serviceIds)
		->find($serviceIds);
		
		foreach ($services as $service) {
			$service->setAttribute('quantity', $serviceStorage[$service->id]['quantity']);
		}		
		
		return $services;
	}	
	
	/** 
	* Добавляет несколько товаров и услуг
	*
    * @return \Illuminate\Database\Eloquent\Collection коллекция товаров и услуг
	*/
	public function multipleAdd() {
		$session = $this->request->session();
		
		$productIds = [];
		foreach ($this->request->input('products') as $product) {
			$productIds[] = $product['id'];
			
			$quantity = (int) $product['quantity'];
			if ($quantity === 0) {
				$session->forget("products.{$product['id']}");
				continue;
			}
			$session->put("products.{$product['id']}", ['id' => $product['id'], 'quantity' => $quantity]);
		}		
		
		$products = $this->getCartProducts($productIds);
		
		$services = [];
		$service_sum = 0;
		if ($this->request->input('services')) {
			$serviceIds = [];
			foreach ($this->request->input('services') as $service) {
				$serviceIds[] = $service['id'];
				
				$quantity = (int) $service['quantity'];
				if ($quantity === 0) {
					$session->forget("services.{$service['id']}");
					continue;
				}
				$session->put("services.{$service['id']}", ['id' => $service['id'], 'quantity' => $quantity]);
			}		
						
			$services = $this->getCartServices($serviceIds);		
			$service_sum = $this->priceService->getServiceSum($services);
		}
		
		return collect(['products' => $products, 'services' => $services, 'service_sum' => $service_sum])->toJson();
	}
	
    /**
     * Удаляет услугу или товар из корзины
	 * @param string $cartData ключ сессии 'products' или 'services' 
     */		
	public function remove($cartData) {
		$id = $this->request->input('id');
		$this->request->session()->forget("$cartData.$id");
	}
    /**
     * Очищает корзину
     */			
	public function clear() {
		$this->request->session()->forget('products');
	}		
	
    /**
     * Возвращает товар добавленный в корзину
     *
	 * @return string строка json с объектом товара
     */		
	public function getProduct() {
		$id = (int) $this->request->input('id');
		$quantity = (int) $this->request->session()->get("products.$id")['quantity'];
		return $this->product->select('name', 'id')->with([
				'price.price_history' => function ($query) {
					$query->select('price', 'product_id', 'id');
				},
				'product_images' => function ($query) {
					$query->select('name', 'product_id')->first();
				},
				'product_stock'
			])->findOrFail($id)->setAttribute('quantity', $quantity)->toJson();		
	}
	
    /**
     * Возвращает товары сессии
     *
	 * @return \Illuminate\Database\Eloquent\Collection
     */		
	protected function getProducts() {
		$sessionProducts = $this->request->session()->get($this->productsData);
		if (!$sessionProducts) throw new CartException('Корзина пуста');
		$ids = array_keys($sessionProducts);
		
		return $this->product->with([
			'price.price_history' => function ($query) {
				$query->select('price', 'product_id', 'id');
			},
			'product_images' => function ($query) {
				$query->where('level', 0);
			},
			'unit' => function($query) {
				$query->select('id', 'reduction');
			},			
			'product_stock'
		])->orderByRaw(DB::raw('FIELD(id,'.implode(',', array_fill(0, count($ids), '?')).')'), $ids)->find($ids);
	}
	
    /**
     * Возвращает товары для оформления заказа
     *
	 * @return \Illuminate\Database\Eloquent\Collection
     */			
	protected function getOrderedProducts() {
		$sessionProducts = $this->request->session()->get($this->productsData);
		$products = $this->getProducts($this->productsData);
			
		$to_much = false;	
		foreach($products as $product) {
			$product->setAttribute('quantity', $sessionProducts[$product->id]['quantity']);
			// Если добавлено большее количество товара, чем есть в наличии
			if ($product->quantity > $product->product_stock->quantity) {
				$product->setAttribute('to_much', true);
				$to_much = true;
				// Устанавливается количество товара, которое есть в наличии
				$this->productStock($product);
			} 
		}
		if ($to_much) throw new TooManyPurchasesException($products);
		
		return $products;
	}

    /**
     * Возвращает товары сессии по ключу
     *
     * @param string $productsData
	 * @return \Illuminate\Database\Eloquent\Collection
     */		
	public function all($productsData) {
		$this->productsData = $productsData;
		$sessionProducts = $this->request->session()->get($productsData);
		$products = $this->getProducts($productsData);	

		foreach($products as $product) {
			$product->setAttribute('quantity', $sessionProducts[$product->id]['quantity']);
			// Если добавлено большее количество товара, чем есть в наличии
			if ($product->quantity > $product->product_stock->quantity) {
				// Устанавливается количество товара, которое есть в наличии
				$this->productStock($product);
			} 
		}
		
		return $products;		
	}

	/**
	* Возвращает модели товаров заказа
	*
	* @return \Illuminate\Database\Eloquent\Collection
	*/		
	public function orderProducts() {
		$productIds = array_keys( $this->request->session()->get('order_products') );
		
		return $this->getCartProducts($productIds);		
	}

	/**
	* Возвращает все модели товаров корзины
	*
	* @return \Illuminate\Database\Eloquent\Collection
	*/	
	public function allProducts() {
		$productIds = array_keys( $this->request->session()->get('products') );
		
		return $this->getCartProducts($productIds);
	}
	
	/**
	* Возвращает модели товаров для печати
	*
	* @return \Illuminate\Database\Eloquent\Collection
	*/
	public function getPrintProducts() {
		$print = json_decode( $this->request->input('print'), true );
		$productIds = array_keys($print['products']);
		
		return $this->getProductModels($print['products'], $productIds);		
	}

	/**
	* Возвращает модели услуг заказа
	*
	* @return \Illuminate\Database\Eloquent\Collection
	*/	
	public function orderServices() {
		$serviceIds = array_keys( $this->request->session()->get('order_services') );
		
		return $this->getCartServices($serviceIds);
	}	

	/**
	* Возвращает все модели услуг корзины
	*
	* @return \Illuminate\Database\Eloquent\Collection
	*/		
	public function allServices() {
		$sessionServices = $this->request->session()->get('services');
			
		$serviceIds = ($sessionServices) ? array_keys( $sessionServices ) : [];
		
		return $this->getCartServices($serviceIds);
	}	
	
	/**
	* Возвращает модели услуг для печати
	*
	* @return \Illuminate\Database\Eloquent\Collection
	*/
	public function getPrintServices() {
		$print = json_decode( $this->request->input('print'), true );
		$serviceIds = array_keys($print['services']);
		
		return $this->getServiceModels($print['services'], $serviceIds);		
	}	
	
    /**
     * Добавляет товары в сессию с ключом 'order' для оформления заказа
     */		
	public function addToOrder() {
		$order_products = $this->request->input('order_products');
		$order_services = $this->request->input('order_services');
		$products = [];
		$services = [];
		foreach ($order_products as $product) {
			$products[$product['id']] = $product;
		}
		foreach ($order_services as $service) {
			$services[$service['id']] = $service;
		}		
		$this->request->session()->put('order_products', $products);
		$this->request->session()->put('order_services', $services);
	}	
	
    /**
     * Сохраняет данные о заказе в БД и отправляет на почту
	 * Вычетает из количеств товаров в наличии количества заказаных товаров 
     *
	 * @return \Illuminate\Database\Eloquent\Collection
     */			
	public function checkout() {
		$products = $this->orderProducts();
		$services = $this->orderServices();
		
		$magazine_sales = [];
		foreach ($products as $product) {
			$magazine_sale = new \App\Magazine_sale(['product_id' => $product->id, 'quantity' => $product->quantity]);
			$magazine_sale->price_history_id = $product->price->price_history_id;
			$magazine_sales[] = $magazine_sale;			
		}
		
		$service_magazine_sales = [];
		foreach ($services as $service) {
			$service_magazine_sale = new \App\Service_magazine_sale(['service_id' => $service->id, 'quantity' => $service->quantity]);
			$service_magazine_sale->service_price_history_id = $service->service_price->service_price_history_id;
			$service_magazine_sales[] = $service_magazine_sale;
		}	
	
		$customer = new \App\Customer( $this->request->input('customer') );
		$sale = new \App\Sale;	
		
		$customer->save();
		$customer->sales()->save($sale)
		->magazine_sales()->saveMany($magazine_sales);
		
		$sale->service_magazine_sales()->saveMany($service_magazine_sales);
		
		$sale_status = new \App\Sale_status;
		$sale_status->status_id = 1;
		$sale_status->sale_id = $sale->id;		
		$sale_status->save();		
		
		
		Mail::to('spblaminat@mail.ru')->send(new OrderShipped($sale));
		Mail::to($customer)->send(new OrderCustomerShipped($sale));
		
		$session = $this->request->session();
		$session->put("products", array_diff_key( $session->get('products'), $session->get('order_products') ));
		if ($session->get('services')) $session->put("services", array_diff_key( $session->get('services'), $session->get('order_services') ));
		
		$session->forget('order_products');
		$session->forget('order_services');
		
		return collect(['products' => $products, 'services' => $services]);		
	}
}
