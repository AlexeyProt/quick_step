<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Page;

/* Проверяет маршрут */
class RouteChecker 
{
	public $request;
	
	public $page;
	
	public function __construct(Request $request, Page $page) {
		$this->request = $request;
		$this->page = $page;
	}
	/**
	* Получает название маршрута из модели Route по соответствующему пути.
	* Запускает действие маршрута передав ему параметр Model $page.
	* Возварщает ответ
	*/
	public function run() {			
		$uri = trim($this->request->path(), '/');
		$uri = preg_replace('/(.*?)\/(\d+$)/', '$1', $uri);
		$page = $this->page->has('page_route.route')->where('uri', $uri)->firstOrFail();

		$routes = Route::getRoutes();
		if ($route = $routes->getByName($page->page_route->route->name)) {
			if ($route->matches($this->request)) {
				$route->bind($this->request);
				$route->setParameter($page->page_route->route->name, $page);
				return $route->run();				
			}
		}
		abort(404);
	}	
}
