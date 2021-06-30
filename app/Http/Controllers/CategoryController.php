<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use App\Services\CategoryService;
use App\Services\ProductService;
use App\Services\PaginationService;
use App\Product;

class CategoryController extends Controller
{
	public $paginationService;
	
	public function __construct(CategoryService $categoryService, PaginationService $paginationService) {
		$this->categoryService = $categoryService;
		$this->paginationService = $paginationService;
	}
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
	 * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product, ProductService $productService, Page $page)
    {
		$category = $page->categories_view()->first()->category;		
		$childCategories = $category->where('parent_id', $category->id)->with([
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
		
		
		$childCategories = $this->categoryService->attributes($childCategories);
		
		$products = $product->whereIn('category_id', $this->categoryService->getChildCategoryIds($category->id));
		$products = $productService->getProductsBuilder($products);
		
		$this->paginationService->addBuilder($products);
		
		$products = $this->paginationService->paginate(16);
		$products = $productService->attributes($products);
		
		return view('pages.categories', [
			'page' => $page,
			'category' => $category,
			'childCategories' => $childCategories,
			'products' => $products
		]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
