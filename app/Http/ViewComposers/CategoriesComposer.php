<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use App\Http\ViewComposers\Contracts\ViewComposer;
use App\Services\TreeService;
use App\Category;

class CategoriesComposer implements ViewComposer
{
    protected $category;
	
	protected $treeService;
	
	public function __construct(Category $category, TreeService $treeService) {
		$this->category = $category;
		$this->treeService = $treeService;
	}
	
	protected function getCategoryTree() {
		preg_match('#/category/edit/(\d*)#', request()->path(), $matches);
		$active_id = (isset($matches[1])) ? $matches[1] : null;

		$categories = $this->category->withoutGlobalScope('published')->get();
		
		return $this->treeService->buildNavigation($categories, $active_id);			
	}
	
	public function compose(View $view) {
		$view->with('categories', $this->getCategoryTree());
	}
}
