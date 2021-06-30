<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\RouteChecker;

class View_relationController extends Controller
{
	protected $routeChecker;
	
    public function __construct(RouteChecker $routeChecker) {
		$this->routeChecker = $routeChecker;
	}
	
	public function show($uri='') {
		$module = $this->module->find($uri);
		if ($module) {
			$collection = Route::getRoutes();
			foreach($collection as $route) {
				var_dump($route->getName(), $route->matches($this->request));
			}
			$route = Route::getRoutes()->getByName($module->route);
/* 			$controller = $route->getController();
			$method = $route->getActionMethod();
			$parameters = $route->parameterNames(); */
			/* var_dump($parameters, $method); */
			/* return $controller->callAction($method, ['page']); */
			/* return $this->controllerDispatcher->dispatch($route, $controller, $method); */
			/* var_dump($route->matches($this->request)); */
			
			$route->bind($this->request);
			return $route->run();
		}
			
/* 		if ( $this->view_relationService->get($uri) ) return; 
		$routeCollection = Route::getRoutes();

		$current = $this->router->currentRouteName();
	
		var_dump($current, $this->router->input('uri'));
		foreach ($routeCollection as $value) {
			var_dump($value->getName(), $value->uri(), $value->getActionMethod());
			if ( $value->getName() === 'page' ) {
				return $value->getController()->show($uri);
			}
		} */
	
/* 		$page = $this->page->find($uri);
		return view('pages.page', ['page' => $page]);		 */
	}
	
	public function test() {
		var_dump('rc');
		return $this->routeChecker->test();
	}	
}
