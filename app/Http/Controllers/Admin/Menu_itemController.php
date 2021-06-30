<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Page;
use App\Menu_item;
use App\Services\TreeService;
use App\Services\Menu_itemService;

class Menu_itemController extends Controller
{
	public $menu_item;
	
	public function __construct(Menu_item $menu_item) {
		$this->menu_item = $menu_item;
	}
	
    public function index(TreeService $treeService) {
		$page = new Page();
		$page->title = 'Меню';			
		
		$menu_items = $this->menu_item->with([
			'page' => function ($query) {
				$query->select('id', 'uri');
			}])
			->get();
		$menu_items = $treeService->build($menu_items);

		return view('admin.pages.menuItems', ['page' => $page, 'menu_items' => $menu_items]);
	}
	
	/**
	* Добавляет или обновляет пункты меню полученные из запроса.
	* Удаляет пункты меню, которых нет в запросе
	*
    * @param  \Illuminate\Http\Request  $request	
    * @return array все модели пунктов меню сохраненные в БД 	
	*/
	public function save(Request $request, Menu_itemService $menu_itemService) {
		return $menu_itemService->save($request);
	}
	
	public function all(TreeService $treeService) {
		$menu_items = $this->menu_item->with([
			'page' => function ($query) {
				$query->select('id', 'uri');
			}])
			->get();
			
		return $treeService->build($menu_items);
	}
}
