<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use App\Page;
use App\Draft;
use App\Services\PageService;

class PageController extends Controller
{
	public $page;
	
	public $pageService;
	
	public function __construct(Page $page, PageService $pageService) {
		$this->page = $page;
		$this->pageService = $pageService;		
	}
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		$page = new Page();
		$page->title = 'Опубликованные страницы';
		$page->description = $page->title;				
        /* $pages = $this->page->page_route()->first()->route->where('name', 'page')->get(); */
		$pages = $this->page->whereHas('page_route.route', function ($query) {
			$query->where('name', 'page');
		})->get();
		return view('admin.pages.pages', ['page' => $page, 'pages' => $pages]);
    }

	public function pagesViews() 
	{
		$page = new Page();
		$page->title = 'Страницы';
		$page->description = $page->title;		
		
		$pages = $this->page->whereHas('page_route.route', function ($query) {
			$query->where('name', 'page');
		})->get();
		return view('admin.pages.pagesViews', ['page' => $page, 'pages' => $pages]);		
	}

	public function sortOrder(Request $request) 
	{
		return $this->pageService->sortOrder($request);
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
		$page = new Page();
		$page->title = 'Редактирование страницы';
		$page->description = $page->title;			
        $draft = new Draft();
		/* $draft->save(); */
		return view('admin.pages.editPage', ['page' => $page, 'editablePage' => $draft]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		$this->page = new Page($request->all());				
		try {
			$this->page->save();
		} catch (QueryException $e)	{
			$code = $e->getCode();
			return response("SQLSTATE: $code", 500);
		}			
		return $this->page;
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
		$page->title = 'Редактирование страницы';
		$page->description = $page->title;			
        $editablePage = $this->page->findOrFail($id);
		return view('admin.pages.editPage', ['page' => $page, 'editablePage' => $editablePage]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
		$this->page = $this->page->findOrFail($request->input('id'));				
		try {
			$this->page->update( $request->all() );
		} catch (QueryException $e)	{
			$code = $e->getCode();
			return response("SQLSTATE: $code", 500);
		}			
		return $this->page;
    }
	
    public function publish(Request $request)
    {			
		try {
			$this->page = $this->page->updateOrCreate(['id' => $request->input('id')], $request->all());
			try {
				$route = new \App\Route;
				$route = $route->where('name', 'page')->first();
				$this->page->page_route()->create(['route_id' => $route->id]);
			} catch (QueryException $e) {
				return response('published', 500);
			}			
		} catch (QueryException $e)	{
			$code = $e->getCode();
			return response("SQLSTATE: $code", 500);
		}			
		return $this->page;		
    }	

	public function searchData(Request $request) {
		return $this->pageService->searchDataByTitleOrURI($request)->toJson();
	}	

	public function all() {
		return $this->pageService->all();
	}


	public function get(Request $request) {
		return $this->page->select('id', 'title', 'uri')->findOrFail($request->input('id'));
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
