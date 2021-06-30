<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use App\Services\CategoryService;
use App\Services\TreeService;
use App\Page;
use App\Services\Uploader;

class CategoryController extends Controller
{
	public $category;
	
	public $categoryService;
	
	public $treeService;	
	
	public function __construct(Category $category, CategoryService $categoryService, TreeService $treeService) {
		$this->category = $category;
		$this->categoryService = $categoryService;
		$this->treeService = $treeService;		
	}
	
	public function getUri(Request $request) {
		$category = $this->category->withoutGlobalScope('published')->with(['products_view.page' => function ($query) {
			$query->select('id', 'uri')->withoutGlobalScope('published');
		}])->findOrfail($request->input('id'));
		return $category->products_view->page->uri;
	}	
	
	public function get(Request $request) {
		return $this->category->withoutGlobalScope('published')->with('category_image', 'categories_view.page', 'products_view.page')->findOrfail($request->input('id'));
	}
    /**
     * Обновляет порядок и иерархию категорий.
     *
     * @param  \Illuminate\Http\Request  $request
     */	
	public function updateOrder(Request $request) {
		$this->categoryService->updateOrder($request->all());
	}
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		$page = new Page();
		$page->title = 'Категории';	
		
/* 		$categories = $this->category->withoutGlobalScope('published')->whereNull('parent_id')->with('category_image');
		
		$this->paginationService->addBuilder($categories);
		$categories = $this->paginationService->paginate(15);
				
		$subCategories = $this->category->withoutGlobalScope('published')->whereNotNull('parent_id')->with('category_image')->get()->groupBy('parent_id'); */
		
		$categories = $this->category->withoutGlobalScope('published')->with('category_image')->get();
		$categories = $this->treeService->build($categories);	
	
		return view('admin.pages.categories', ['page' => $page, 'categories' => $categories]);
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
        $category = $this->categoryService->store($request);
		
		$this->categoryService->updateOrder(json_decode( $request->input('categories'), true ));
		
		return $category->toJson();
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
		$category = $this->categoryService->update($request);
		
		$this->categoryService->updateOrder(json_decode( $request->input('categories'), true ));
		
		return $category->toJson();	   
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
	
    /**
     * Загружает изображение категории и заменяет его изображением меньшего размера
	 *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Services\Uploader  $uploader
	 * @return string название изображения
     */	
	public function uploadImage(Request $request, Uploader $uploader) {
		return $uploader->uploadMiniMediumImage('images/categories/');				
	}		
}
