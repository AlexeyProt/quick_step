<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use App\Services\CategoryService;

class PageController extends Controller
{
	protected $page;
	
    public function __construct(Page $page, CategoryService $categoryService) {
		$this->page = $page;
		$this->categoryService = $categoryService;
	}

	public function main(Page $page) {
		$categories = new \App\Category;
		
		$categories = $categories->whereIn('parent_id', [4, 29, 40, 39])->
		with([
			'categories_view.page' => function ($query) {
				$query->select('id', 'uri');
			},
			'products_view.page' => function ($query) {
				$query->select('id', 'uri');
			},			
			'category_image',
			'category_characteristics.characteristic',
			'category_price'
		])->get();		
		
		$categories = $this->categoryService->attributes($categories);
		
		$floors = collect();
		$laminates = collect();
		$vinils = collect();
		$parquets = collect();
		
		foreach ($categories as $category) {
			switch ($category->parent_id) {
				case 4:
					$laminates[] = $category;
					break;
				case 29:
					$vinils[] = $category;
					break;
				case 40:
					$parquets[] = $category;
					break;
				case 39:
					$floors[] = $category;
					break;					
			}
		}
		

		return view('pages.mainPage', ['page' => $page, 'floors' => $floors, 'laminates' => $laminates, 'vinils' => $vinils, 'parquets' => $parquets]);		
	}
	
	public function show(Page $page) {
		return view('pages.page', ['page' => $page]);		
	}
	
	public function contacts(Page $page) {
		return view('pages.contactsPage', ['page' => $page]);		
	}	
}
