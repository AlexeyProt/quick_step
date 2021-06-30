<?php

namespace App\Http\Controllers\Editor;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Page;
use App\Product;
use App\Category;
use App\Services\Admin\ProductService;
use App\Services\TreeService;

class ProductController extends Controller
{
	public $page;
	
	public $product;
	
	public $category;
	
	public $treeService;
	
	public function __construct(Page $page, Category $category, Product $product, TreeService $treeService) {
		$this->page = $page;
		$this->product = $product;		
		$this->category = $category;
		$this->treeService = $treeService;
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

	public function mainPage() {
		$this->page->title = 'Панель управления';		
		
/* 		$categories = $this->category->withoutGlobalScope('published')->with('category_image')->get();
		$categories = $this->treeService->build($categories);	 */
		
		return view('editor.pages.main', ['page' => $this->page]);
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
		$product = $this->product->findOrfail($id);
		
		$this->page->title = $product->name;		
		
		return view('editor.pages.editProduct', ['page' => $this->page, 'product' => $product]);  
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Product
     */
    public function update(Request $request, ProductService $productService)
    {
		$product = $this->product->findOrFail($request->input('product.id'));	
		$price_history = new \App\Price_history($request->input('price_history'));

		return $productService->updatePrice($product, $price_history);
    }

	/**
	 * Обновляет цены товаров
	 *
     * @param  \Illuminate\Http\Request  $request	
	 * @return \Illuminate\Database\Eloquent\Collection
	 */
	public function updatePrices(Request $request, ProductService $productService)
	{
		$products = $this->product->select('id', 'category_id')->with('price.price_history')->findOrFail($request->input('ids'));
		$price_history = new \App\Price_history(['price' => $request->input('price')]);
		
		return $productService->updatePricesAndCategoryPrices($products, $price_history);
/* 		$category_ids = [];
		foreach ($products as $product) {
			$product = $productService->updatePrice($product, $price_history);
			
			$category_ids[$product->category_id] = $product->category_id;
		}
		
		$pr = $this->product->select('id', 'category_id')
			->whereIn('category_id', $category_ids)
			->with('price.price_history')->get()->groupBy('category_id');
		
		foreach ($pr as $p) {
			$minPrice = $p->map(function ($item, $key) {
				return $item->price->price_history->price;
			})->min();
			var_dump($minPrice);
		}
		
		return $products->keyBy('id'); */
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
