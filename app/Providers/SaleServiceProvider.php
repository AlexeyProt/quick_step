<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\SaleService;

class SaleServiceProvider extends ServiceProvider
{
	protected $defer = true;
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(SaleService::class, function($app) {
			return new SaleService($app->make('\App\Services\PriceService'), $app->make('\App\Services\CategoryService'));
		});
    }
	
	/**
	* Получить сервисы от провайдера.
	*
	* @return array
	*/
	public function provides()
	{
		return [SaleService::class];
	}	
}
