<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;

class PaginationServiceProvider extends \Illuminate\Pagination\PaginationServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {		
        Paginator::viewFactoryResolver(function () {
            return $this->app['view'];
        });

        Paginator::currentPathResolver(function () {
			$path = preg_replace('/(.*?)\/(\d+)/', '$1', $this->app['request']->url());
            return $path;
        });

        Paginator::currentPageResolver(function () {
			$page = preg_replace('/(.*?)\/(\d+)/', '$2', $this->app['request']->url());

            if (filter_var($page, FILTER_VALIDATE_INT) !== false && (int) $page >= 1) {
                return $page;
            }

            return 1;
        });
    }
}
