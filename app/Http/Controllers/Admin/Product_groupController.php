<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product_group;
use App\Page;
use App\Category;
use App\Services\PaginationService;
use App\Services\Uploader;

class Product_groupController extends Controller
{
	public $product_group;
	
	public $paginationService;
	
	public function __construct(Product_group $product_group, PaginationService $paginationService) {
		$this->product_group = $product_group;
		$this->paginationService = $paginationService;
	}		
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		$page = new Page();
		$page->title = 'Группы товаров';
		$page->description = $page->title;		
		
		$product_groups = $this->product_group->with([
			'category' => function ($query) {
				$query->withoutGlobalScope('published');
			},
			'product_group_images'
		]);
		
		$this->paginationService->addBuilder($product_groups);
		$product_groups = $this->paginationService->paginate(15);
	
		return view('admin.pages.productGroups', ['page' => $page, 'product_groups' => $product_groups]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
		$page = new Page();
		$page->title = 'Редактирование группы товаров';
		$page->description = $page->title;			
		$categories = new Category();
		$categories = $categories->withoutGlobalScope('published')->get();
		return view('admin.pages.editProductGroup', ['page' => $page, 'categories' => $categories]);
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
		$page = new Page();
		$page->title = 'Редактирование группы товаров';
		$page->description = $page->title;			
        $product_group = $this->product_group->with(['product_group_view.page' => function($query) {
			$query->withoutGlobalScope('published');
		}])->findOrFail($id);
		$categories = new Category();
		$categories = $categories->withoutGlobalScope('published')->orderByRaw('id = ? desc', [$product_group->category_id])->get();			
		
		return view('admin.pages.editProductGroup', ['page' => $page, 'product_group' => $product_group, 'categories' => $categories]);
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
     * @param  \Illuminate\Http\Request  $request	 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
		$this->product_group = $this->product_group->findOrFail($request->input('product_group.id'));
        $this->product_group->product_group_view->page()->withoutGlobalScope('published')->delete();
		$this->product_group->delete();
    }

    public function publish(Request $request)
    {
        $this->product_group = $this->product_group->create($request->input('product_group'));
		$page = new \App\Page($request->input('page'));
		$product_group_images = [];		
		foreach($request->input('product_group_images') as $key => $product_group_image) {
			$product_group_image = new \App\Product_group_image($product_group_image);
			$product_group_image->level = $key;
			$product_group_images[] = $product_group_image;
		}		
		
		$this->product_group->product_group_images()->saveMany($product_group_images);

		$page->save();
		$this->product_group->product_group_view()->create(['page_id' => $page->id]);
		$page->page_route()->create(['route_id' => 7]);		
		return $this->product_group->toJson();			
    }		

    public function updatePublication(Request $request)
    {
		$this->product_group = $this->product_group->findOrFail($request->input('product_group.id'));	
		$this->product_group->update( $request->input('product_group') );
		
		$this->product_group->product_group_images()->delete();
		
		$product_group_images = [];
		foreach($request->input('product_group_images') as $key => $product_group_image) {
			$product_group_image = new \App\Product_group_image($product_group_image);
			$product_group_image->level = $key;
			$product_group_images[] = $product_group_image;
		}
		$this->product_group->product_group_images()->saveMany($product_group_images);

		$this->product_group->product_group_view->page()->withoutGlobalScope('published')->update($request->input('page'));
		return $this->product_group->toJson();			
    }	
	
    /**
     * Загружает изображения группы товаров и создает миниатюры
     */	
	public function uploadImages(Request $request) {
		$uploader = new Uploader();
		$uplodedImages = $uploader->uploadMiniMultiple('images/products/');		
		
		$images = ($request->input('product_group.id')) ? $this->product_group->find($request->input('product_group.id'))->product_group_images : collect();
		foreach($uplodedImages as $uploadImage) {
			$images->push($uploadImage);
		}
		return $images->toJson();
	}		
}
