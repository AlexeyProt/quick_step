<?php

namespace App\Services;

use App\View_relation;
use App\Product_view;
use App\Page;

class View_relationService
{
    public $view_relation;
	
	
	public function __construct(View_relation $view_relation) {
		$this->view_relation = $view_relation;
	}
	
	public function get($page_uri) {
		$this->view_relation = $this->view_relation->where('page_uri', $page_uri)->first();
		if (!$this->view_relation) return false;
		/* $this->product_view(new Product_view); */
		$this->page_view(new Page);
		return true;
	}
	
	public function page_view(Page $page) {
		$page = $page->find($this->view_relation->page_uri);
		var_dump($page);
		return view('pages.page', ['page' => $page]);		
	}
	
	public function product_view(Product_view $product_view) {
		var_dump($product_view->find($this->view_relation->page_uri));
		$view = explode('_', $this->view_relation->name);
		var_dump($view);
		/* return view("pages.$view", ["$view" => $this->view_relation]);		 */
	}
}
