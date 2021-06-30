<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Menu_item;
use App\Services\TreeService;

class Menu_itemService
{
	public $menu_item;
	
	public function __construct(Menu_item $menu_item, TreeService $treeService) {
		$this->menu_item = $menu_item;
		$this->treeService = $treeService;
	}	
	
	/**
	* Добавляет или обновляет пункты меню полученные из запроса.
	* Удаляет пункты меню, которых нет в запросе
	*
    * @param  \Illuminate\Http\Request  $request	
    * @return array все модели пунктов меню сохраненные в БД 	
	*/
	public function save(Request $request) {
		$menu_items = $this->menu_item->all()->keyBy('id');
		$savedMenuItems = []; // Отсортирован по значеню sort_order пунктов меню
		
		foreach ($request->input('menuItems') as $requestedMenuItem) {
			// Если модель уже есть в БД
			if (isset($menu_items[$requestedMenuItem['id']])) {
				// в parent_id устанавливатся id пункта меню, у которого sort_order равен parent_sort_order текущего пункта меню
				$menu_items[$requestedMenuItem['id']]->parent_id = (isset($requestedMenuItem['parent_sort_order'])) ?
					$savedMenuItems[$requestedMenuItem['parent_sort_order']]->id : null;
					
				$menu_items[$requestedMenuItem['id']]->update($requestedMenuItem);
				
				$savedMenuItems[$menu_items[$requestedMenuItem['id']]->sort_order] = $menu_items[$requestedMenuItem['id']];
				
				$menu_items->forget($requestedMenuItem['id']);
				
				continue;
			}
			$menu_item = new Menu_item($requestedMenuItem);
			if (isset($requestedMenuItem['parent_sort_order'])) $menu_item->parent_id = $savedMenuItems[$requestedMenuItem['parent_sort_order']]->id;
			
			$menu_item->save();
			
			$savedMenuItems[$requestedMenuItem['sort_order']] = $menu_item;			
		}
		
		$deletedMenuItems = [];
		foreach ($menu_items as $menu_item) {
			$deletedMenuItems[] = $menu_item->id;
		}
		
		$this->menu_item->destroy($deletedMenuItems);
		
		return $savedMenuItems;
	}
	
	public function getTree($menu_number=null) {
		if ($menu_number) {
			$menu_items = $this->menu_item->where('menu_number', $menu_number)->
			with([
				'page' => function ($query) {
					$query->select('id', 'uri');
				}])
				->get();			
		} else {
			$menu_items = $this->menu_item->with([
				'page' => function ($query) {
					$query->select('id', 'uri');
				}])
				->get();			
		}
			
		return $this->treeService->build($menu_items);
	}	
}
