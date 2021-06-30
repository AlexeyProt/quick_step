<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Page;
use App\Services\CartService;
use App\Services\PriceService;
use App\Services\CategoryService;
use App\Services\Recaptcha;

class CartController extends Controller
{
	protected $request;
	
	public $product;
	
	public $cartService;
	
	public function __construct(Request $request, Product $product, CartService $cartService) {
		$this->request = $request;
		$this->product = $product;
		$this->cartService = $cartService;
	}
	
	public function index() {
		$page = new Page();
		$page->title = 'Корзина';
		$page->description = 'Корзина';
		$products = $this->cartService->allProducts();
		$services = $this->cartService->allServices();
		
		return view('pages.cart', ['page' => $page, 'products' => $products, 'services' => $services]);	
	}
	
	public function printOrder(PriceService $priceService, CategoryService $categoryService) {
		$page = new Page();
		$page->title = 'Распечатать заказ';
		$products = $this->cartService->getPrintProducts();
		$products = $categoryService->sort($products, ['Ламинат', 'Винил', 'Паркетная доска', 'Подложка', 'Герметик', 'Клей', 'Плинтус']);
		$services = $this->cartService->getPrintServices();
		$product_sum = $priceService->getProductSum($products);
		$service_sum = $priceService->getServiceSum($services);
		$total_amount = $product_sum + $service_sum;
		
		return view('layouts.print', [
			'page' => $page, 'products' => $products,
			'services' => $services,
			'service_sum' => $service_sum,
			'total_amount' => $total_amount
		]);	
	}
	
	public function getAll() {
		return $this->request->session()->get('products');
	}	
	
    public function add() {
		return $this->cartService->add();
	}
	
    public function addService() {
		return $this->cartService->addService();
	}	
	
    public function multipleAdd() {
		return $this->cartService->multipleAdd();
	}	
	
	public function remove() {
		$this->cartService->remove('products');
	}
	
	public function removeService() {
		$this->cartService->remove('services');
	}	
	
	public function clear() {
		$this->cartService->clear();
	}	
	
	public function get() {
		return $this->cartService->getProduct();
	}

	public function addToOrder() {
		$this->cartService->addToOrder();
	}	
	
	public function order() {		
		$page = new Page();
		$page->title = 'Ваш заказ';
		$page->description = 'Оформление заказа';
		$products = $this->cartService->orderProducts();
		$services = $this->cartService->orderServices();
		$delivery = \App\Service::where('name', 'Доставка')->firstOrFail();
		return view('pages.order', [
			'page' => $page, 'products' => $products,
			'services' => $services, 'delivery' => $delivery
		]);				
	}	
	
	public function checkout(Recaptcha $recaptcha) {
		$recaptcha->check();
		
		return $this->cartService->checkout();
	}		
}
