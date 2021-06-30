<?php

namespace App\Services;

use App\Sale;
use App\Services\PriceService;
use App\Services\CategoryService;

class SaleService
{
	public $priceService;
	
	public $categoryService;
	
	public function __construct(PriceService $priceService, CategoryService $categoryService) {
		$this->priceService = $priceService;
		$this->categoryService = $categoryService;
	}
	/**
	* Устанавливает атрибуты модели Sale
	* 
	* @param \App\Sale $sale;
	* @return \App\Sale;
	*/
    public function attributes(Sale $sale) {
		$sale->load([
			'magazine_sales.product.category' => function($query) {
				$query->withoutGlobalScope('published');
			},
			'magazine_sales.product.product_images','magazine_sales.product.unit', 'magazine_sales.product.promotional_product',
			'magazine_sales.price_history',
			'service_magazine_sales.service.service_unit.unit', 'service_magazine_sales.service_price_history'
		]);
		
		/* $sale = $this->priceService->totalAmountAttr($sale);	 */
		$sale = $this->priceService->totalAmountAndDiscountsAttr($sale);
		$sale->delivery_price = $sale->getDeliveryPrice();
		$sale->total_amount += $sale->delivery_price;

		return $sale;
	}
	
	/**
	* Сортирует товары заказа по категориям
	*
	* @param \App\Sale $sale
	* @param array $parentCategoryNames названия категорий в порядке сортировки
	* @return \App\Sale
	*/	
	public function sortCategories(Sale $sale, $parentCategoryNames) {
		$categories = \App\Category::withoutGlobalScope('published')->get()->keyBy('name');
		$parentCategoryNames = array_flip($parentCategoryNames);
		$parentCategoryies = $categories->filter(function($value, $key) use ($parentCategoryNames) {
			return isset($parentCategoryNames[$key]);
		});

		$sale->magazine_sales = $sale->magazine_sales->sortBy(function($magazine_sale, $key) use ($parentCategoryNames, $categories, $parentCategoryies) {
			$category = $magazine_sale->product->category;
			if (!isset($parentCategoryNames[$category->name])) $category = $this->categoryService->getParent($categories, $magazine_sale->product->category, $parentCategoryies);		

			return $parentCategoryNames[$category->name];
		});		
		$sale->magazine_sales->values();
		
		return $sale;
	}
}
