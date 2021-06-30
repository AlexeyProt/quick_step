<?php

namespace App\Exceptions\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Route as Route2;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RouteChecker 
{
	public $request;
	
	public function __construct(Request $request) {
		$this->request = $request;
	}
	
	public function change() {
		$route2 = app()->make(Route2::class);
		$r2 = Route::getRoutes();
		foreach($r2 as $value) {
			var_dump($value->getName());
		}
		$routes = Route::getRoutes();
		$view = null;
		foreach ($routes as $route) {
			var_dump($route->getName());
			if ($route->matches($this->request)) {
				try {
					$route->bind($this->request);
					return $route->run();
				} catch(ModelNotFoundException $e) {
					var_dump('exp');
					continue;
				}
			}
			
		}
	}
}
