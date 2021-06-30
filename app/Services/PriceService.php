<?php

namespace App\Services;

use App\Sale;

class PriceService
{
	const MIN_SERVICES_PRICE = 5000;
	
	const DISCOUNT_CATEGORIES = [];
	/** 
	* Проверяет категорию товара и все его родительские категории является ли они скидочными
	* 
	* @param \Illuminate\Database\Eloquent\Collection $categories 
	* @param \App\Category $category 
    * @return boolen
	*/	
	public function isDiscountCategory($categories, $category) {
		for ($target = $category; $target->parent_id; $target = $categories[$target->parent_id]) {			
			foreach (self::DISCOUNT_CATEGORIES as $discountCategory) {
				if ($target->parent_id == $discountCategory) return true;
			}
		}
		
		return false;
	}
	
	/** 
	* Устанавливает товару атрибуты discount и discount_price
	* 
	* @param \App\Product $product
	* @param int $discount
    * @return \App\Product
	*/			
	public function discountAttribute($product, $discount) {
		$sum = $product->price->price_history->price * $product->quantity;
		$discount_price = round( $sum - ($sum * $discount / 100), 2, PHP_ROUND_HALF_UP);
		
		$product->setAttribute('discount', $discount);		
		$product->setAttribute('discount_price', $discount_price);	
		
		return $product;		
	}	
	
	/** 
	* Устанавливает товару атрибуты discount и discount_price
	* 
	* @param \App\Magazine_sale $magazine_sale
	* @param int $discount
    * @return \App\Product
	*/			
	public function magazineSaleDiscountAttribute($magazine_sale, $discount) {
		$sum = $magazine_sale->price_history->price * $magazine_sale->quantity;
		$discount_price = round( $sum - ($sum * $discount / 100), 2, PHP_ROUND_HALF_UP);
		
		$magazine_sale->setAttribute('discount', $discount);		
		$magazine_sale->setAttribute('discount_price', $discount_price);	
		
		return $magazine_sale;		
	}	
		
	
	/** 
	* Устанавливает товару атрибут discount в зависимости от площади упаковки и количества товара
	* Добавляет в сессию скидку товару
	* 
	* @param \App\Product $product 
    * @return \App\Product
	*/		
	public function areaDiscount($product, $discount) {		
		$area = $product->product_characteristics[0]->value * $product->quantity;
		
/* 		if ($area >= 100) {
			return $this->discountAttribute($product, 10);
		}
		if ($area >= 50) {
			return $this->discountAttribute($product, 5);
		}		
		return $product; */		
		
		return $this->discountAttribute($product, $discount);
	}

	/**
	* Возвращает сумму товаров
	*
	* @param \Illuminate\Database\Eloquent\Collection $products
	* @return int
	*/
	public function getProductSum($products) {
		$product_sum = 0;
		foreach ($products as $product) {		
			$product_sum += $product->price->price_history->price * $product->quantity;
		}				
		
		return $product_sum;
	}	
	/**
	* Возвращает сумму услуг
	*
	* @param \Illuminate\Database\Eloquent\Collection $services
	* @return int
	*/
	public function getServiceSum($services) {
		$service_sum = 0;
		foreach ($services as $service) {		
			$service_sum += $service->service_price->service_price_history->price * $service->quantity;
		}			
		if ($service_sum) {
			if ($service_sum < self::MIN_SERVICES_PRICE) $service_sum = self::MIN_SERVICES_PRICE;
		}		
		
		return $service_sum;
	} 	
	
	/**
	* Возвращает сумму услуг из заказа
	*
	* @param \Illuminate\Database\Eloquent\Collection $service_magazine_sales
	* @return int
	*/	
	public function getServiceMagazineSalesSum($service_magazine_sales) {
		$service_sum = 0;
		foreach ($service_magazine_sales as $service_magazine_sale) {		
			$service_sum += $service_magazine_sale->service_price_history->price * $service_magazine_sale->quantity;
		}			
		if ($service_sum) {
			if ($service_sum < self::MIN_SERVICES_PRICE) $service_sum = self::MIN_SERVICES_PRICE;
		}		
		
		return $service_sum;
	} 	

	/**
	* Устанавливает атрибуты services_sum и total_amount
	*
	* @param \App\Sale $sale
	* @return \App\Sale
	*/
	public function totalAmountAttr(Sale $sale) {
		$sale->total_amount = 0;
		foreach ($sale->magazine_sales as $magazine_sale) {
			$sale->total_amount += $magazine_sale->price_history->price * $magazine_sale->quantity;
		}
		
		$sale->services_sum = $this->getServiceMagazineSalesSum($sale->service_magazine_sales);
		
		$sale->total_amount += $sale->services_sum;
		
		return $sale;
	}

	/**
	* Устанавливает атрибуты services_sum и total_amount
	* Устанавливает атрибуты discount_price и discount на magazine_sale
	*
	* @param \App\Sale $sale
	* @return \App\Sale
	*/	
	public function totalAmountAndDiscountsAttr(Sale $sale) {
		$categories = \App\Category::select('id', 'parent_id')->get()->keyBy('id');
		
		$sale->total_amount = 0;
		foreach ($sale->magazine_sales as $magazine_sale) {
			if ($magazine_sale->product->promotional_product) {
				$magazine_sale = $this->magazineSaleDiscountAttribute($magazine_sale, $magazine_sale->product->promotional_product->discount);
				
				$sale->total_amount += $magazine_sale->discount_price;
				
				continue;
			}			
			
			if ($this->isDiscountCategory($categories, $magazine_sale->product->category)) {
				$magazine_sale = $this->magazineSaleDiscountAttribute($magazine_sale, 10);
				
				$sale->total_amount += $magazine_sale->discount_price;
				
				continue;
			}
			
			$sale->total_amount += $magazine_sale->price_history->price * $magazine_sale->quantity;
		}
		
		$sale->services_sum = $this->getServiceMagazineSalesSum($sale->service_magazine_sales);
		
		$sale->total_amount += $sale->services_sum;
		
		return $sale;
	}	
}
