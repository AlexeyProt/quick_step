<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Page;
use App\Services\PaginationService;

class PageService
{
	public $page;
	
	public $paginationService;
	
	public function __construct (Page $page, PaginationService $paginationService) {
		$this->page = $page;
		$this->paginationService = $paginationService;		
	}
	
	/**
	* Ищет станицы содержащие часть строки $request->input('searchQuery') в поле title или uri
    * Возвращает станицы	
	*
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Database\Eloquent\Collection	
	*/
    public function searchDataByTitleOrURI(Request $request) {
		return $this->page::where('title', 'like', "%{$request->input('searchQuery')}%")
							->orWhere('uri', 'like', "%{$request->input('searchQuery')}%")
							->limit(10)->get();		
	}
	
	public function all() {
		$this->paginationService->addBuilder($this->page);
		return $this->paginationService->paginate(10);
	}
	
	public function sortOrder(Request $request) 
	{
		$column = $request->column;
		$allowedColumns = ['title', 'uri', 'published', 'created_at'];
		
		if (!in_array($column, $allowedColumns, true)) $column = 'created_at';
		
		$builder = $this->page->whereHas('page_route.route', function ($query) {
			/* $query->where('name', 'page'); */
		})
			->select('title', 'uri', 'published', 'created_at')
			->orderBy( $column, $request->order );
			
		$this->paginationService->addBuilder($builder);
			
		return $this->paginationService->paginate(15);
	}	
}
