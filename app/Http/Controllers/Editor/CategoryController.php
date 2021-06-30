<?php

namespace App\Http\Controllers\Editor;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Page;
use App\Product;
use App\Category;
use App\Services\CategoryService;
use App\Services\Search;


class CategoryController extends Controller
{
	public $page;
	
	public $product;
	
	public $category;
	
	
	public function __construct(Page $page, Product $product, Category $category) {
		$this->page = $page;
		$this->product = $product;
		$this->category = $category;
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
	 * Ищет товары категории и товары дочерних категорий
	 * Если пустое поле запрса, то возвращает все товары категорий
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param \App\Services\CategoryService $categoryService
	 * @return \Illuminate\Support\Collection
	 */
	public function search(Request $request, CategoryService $categoryService, Search $search)
	{
		$category_ids = $categoryService->getChildCategoryIds($request->input('categoryId'));
				
		$builder = $this->product->select('id', 'name', 'category_id')
			->with(['price.price_history',
			'product_images' => function($query) {
				$query->where('level', 0);
			},
			'category' => function($query) {
				$query->select('id', 'name')->withoutGlobalScope('published');
			},		
			])
			->whereIn('category_id', $category_ids);
		
		return $search->find($builder, 'name', $request->input('searchQuery'));
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Отображает форму редактирования категории и товары, включая товары дочерних категорий
     *
     * @param  \App\Services\CategoryService  $categoryService	 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(CategoryService $categoryService, $id)
    {
		$category_ids = $categoryService->getChildCategoryIds($id);
		
		$products = $this->product->select('id', 'name', 'category_id')
			->with(['product_images' => function($query) {
					$query->where('level', 0);
				},
				'category' => function($query) {
					$query->select('id', 'name')->withoutGlobalScope('published');
				},
				'price.price_history'
			])
			->whereIn('category_id', $category_ids)->get();
		$category = $this->category->withoutGlobalScope('published')->find($id);
		
		$this->page->title = $category->name;		
		
		return view('editor.pages.editCategory', ['page' => $this->page, 'category' => $category, 'products' => $products]);        
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
