<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Product;
use App\Category;
use App\Services\CategoryService;

class Filter
{
	public $product;
	
	public $category;
	
	public function __construct(Product $product, Category $category, CategoryService $categoryService)
	{
		$this->product = $product;
		$this->category = $category;
		$this->categoryService = $categoryService;		
	}
	
	/*
	 * Возвращает Builder товаров с категориями $categories и их дочерними категориями
	 *
	 * @param \Illuminate\Database\Eloquent\Builder $productsBuilder
	 * @param array $categories
	 * @return \Illuminate\Database\Eloquent\Builder
	 */
	protected function categoriesBuilder($productsBuilder, $categories)
	{
		$categories = current( array_filter($categories) ); // Строка вида category1&category2
		
		if ($categories) {
			$categories = explode('&', $categories);
			
			$categories = $this->category->whereIn('name', $categories)->get();
			
			$categoryIds = [];
			
			foreach ($categories as $category) {
				$categoryIds = $categoryIds + $this->categoryService->getChildCategoryIds($category->id);
			}
			$productsBuilder = $productsBuilder->whereHas('category', function($query) use($categoryIds) {
				$query->whereIn('id', $categoryIds);
			});
		}		
		
		return $productsBuilder;
	}

	/*
	 * Возвращает Builder товаров с характеристиками $characteristics
	 *
	 * @param \Illuminate\Database\Eloquent\Builder $productsBuilder
	 * @param array $characteristics
	 * @return \Illuminate\Database\Eloquent\Builder	 
	 */	
	protected function characteristicsBuilder($productsBuilder, $characteristics)
	{
		$characteristics = current( array_filter($characteristics) ); // Строка вида characteristic1=value1&value2/characteristic2=value1&value2
		
		if ($characteristics) {
			preg_match_all('#(?P<characteristics>[^=/]+)=(?P<values>[^/]+)#ui', $characteristics, $matches);
			
			foreach ($matches['characteristics'] as $key => $characteristic) {
				$values = $matches['values'][$key];
				
				$productsBuilder = $productsBuilder->whereHas('product_characteristics', function($query) use ($characteristic, $values) {
						$query->whereHas('characteristic', function($query) use ($characteristic, $values) {
							$query->where('name', $characteristic);
						})->whereIn('value', explode('&', $values));
					});				
			}
		}	
		
		return $productsBuilder;
	}	

	/*
	 * Фильтр товаров для заросов вида /products/filter/categories/категория/characteristics/характеристика1=значени1&значение2/характеристика2=значени1&значение2
	 *
	 * @param \Illuminate\Http\Request $request
	 * @return \Illuminate\Database\Eloquent\Builder	 
	 */		
	public function get(Request $request, $builder)
	{
		/* preg_match_all('#/categories/(?P<categories>[^/]+)|/characteristics/(?P<characteristics>[^/]+)#', urldecode($request->path()), $matches); */
		preg_match_all('#/categories/(?P<categories>[^/]+)|/characteristics/(?P<characteristics>.+)#ui', urldecode($request->path()), $matches);
		
		$categories = current( array_filter($matches['categories']) );
		$characteristics = current( array_filter($matches['characteristics']) );
	
/* 		$products = $this->product->where(function ($query) {
				$query->has('product_view.page')->
					orHas('laminate_products_view.page');
			})->with([
				'product_view.page' => function ($query) {
					$query->select('id', 'uri');
				},
				'product_view.unit' => function($query) {
					$query->select('id', 'reduction');
				},								
				'laminate_products_view.page' => function ($query) {
					$query->select('id', 'uri');
				},
				'product_characteristics.characteristic',
				'product_images',
				'price.price_history'
			]); */
		
		$builder = $this->categoriesBuilder($builder, $matches['categories']);
		$builder = $this->characteristicsBuilder($builder, $matches['characteristics']);
		
		return $builder;		
	}
}
