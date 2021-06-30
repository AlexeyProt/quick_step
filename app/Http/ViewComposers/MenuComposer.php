<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use App\Http\ViewComposers\Contracts\ViewComposer;
use App\Services\Menu_itemService;

class MenuComposer implements ViewComposer
{
    protected $menu_item;
	
	public function __construct(Menu_itemService $menu_item) {
		$this->menu_item = $menu_item;
	}
	
	public function compose(View $view) {
		$view->with(['menu_items' => $this->menu_item->getTree(1), 'menu_items2' => $this->menu_item->getTree(2)]);
	}
}
