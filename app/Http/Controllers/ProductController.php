<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Page;

class ProductController extends Controller
{
	public $productService;
	
	public function __construct(ProductService $productService) {
		$this->productService = $productService;
	}
    /**
     * Display a listing of the resource.
     *
	 * @param string $uri
     * @return \Illuminate\Http\Response
     */
    public function index(Page $page)
    {	
		$products = $this->productService->all($page);
		return view('pages.products', ['page' => $page, 'products' => $products]);
    }
	
    public function stock(Page $page)
    {	
		$products = $this->productService->promotionalProducts();
		return view('pages.products', ['page' => $page, 'products' => $products]);
    }	


	public function search($name, $pageNumber=1) {
		$products = $this->productService->search($name, $pageNumber);
		$page = new Page();
		$page->title = 'Поиск товаров';
		$page->description = $page->title;		
		$page->content = $name;
		return view('pages.search', ['page' => $page, 'products' => $products]);
	}
	
	public function searchData(Request $request) {
		return $this->productService->searchData($request)->toJson();
	}	
	
	public function get(Request $request)
	{
		return $this->productService->filterAll($request);
	}
	
	public function filter(Request $request)
	{
		return $this->productService->filter($request);
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
     * @param  int  $uri
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {	
		$product = $this->productService->getLaminate($page);		
		
		return view('pages.product', ['page' => $page, 'product' => $product]);
    }
	
    /**
     * Display the specified resource.
     *
     * @param  int  $uri
     * @return \Illuminate\Http\Response
     */
    public function showLaminateProduct(Page $page, \App\Services\TreeService $treeService)
    {	
		$products = $this->productService->getLaminateProducts($page);

/* 		$category_services = \App\Category_service::where('category_id', 4)->
		with('service.service_price.service_price_history')->get(); */
		
		$category_services = $this->productService->getFloorServices($products);
		
		return view('pages.laminateProduct', ['page' => $page, 'products' => $products, 'category_services' => $category_services]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $uri
     * @return \Illuminate\Http\Response
     */
    public function showVinil(Page $page, \App\Services\TreeService $treeService)
    {	
		$products = $this->productService->getLaminateProducts($page);

		$category_services = $this->productService->getFloorServices($products);
		
		return view('pages.vinil', ['page' => $page, 'products' => $products, 'category_services' => $category_services]);
    }	
	
    /**
     * Display the specified resource.
     *
     * @param  int  $uri
     * @return \Illuminate\Http\Response
     */
    public function showGlue(Page $page)
    {	
		$product = $this->productService->getGlue($page);		
		
		return view('pages.glue', ['page' => $page, 'product' => $product]);
    }	
    /**
     * Display the specified resource.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function showGroup(Page $page)
    {
		$product_group = $this->productService->getGroup($page);	
		return view('pages.productGroup', ['page' => $page, 'product_group' => $product_group]);
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
