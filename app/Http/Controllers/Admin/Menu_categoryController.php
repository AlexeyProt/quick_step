<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Page;
use App\Menu_category;
use App\Services\TreeService;

class Menu_categoryController extends Controller
{
	public $menu_category;
	
	public function __construct(Menu_category $menu_category) {
		$this->menu_category = $menu_category;
	}
	
    public function index(TreeService $treeService) {
		$page = new Page();
		$page->title = 'Меню';			
		
		$menu_categories = $this->menu_category->all();
		$menu_categories = $treeService->build($menu_categories);

		return view('admin.pages.menu_categories', ['page' => $page, 'menu_categories' => $menu_categories]);
	}
}
