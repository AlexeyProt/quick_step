<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;

class Admin
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
		if (!isset($user) || !$user->isRole(['admin'])) {
			/* return redirect()->guest(route('login')); */
			throw new AuthenticationException();
		}
        return $next($request);
    }
}
