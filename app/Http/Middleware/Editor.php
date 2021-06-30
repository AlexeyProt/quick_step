<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;

class Editor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		$user = $request->user();
		if (!isset($user) || !$user->isRole(['admin', 'editor'])) {
			throw new AuthenticationException();
		}
        return $next($request);
    }
}
