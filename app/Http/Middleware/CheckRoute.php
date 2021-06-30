<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use App\Helpers\RouteChecker;

class CheckRoute
{
	public function __construct(Response $response, RouteChecker $routeCheker) {
		$this->response = $response;
		$this->routeCheker = $routeCheker;
	}
    /**
     * Handle an incoming request.
     *
     * @return mixed
     */
    public function handle()
    {
		return $this->response->setContent($this->routeCheker->run());
    }
}
