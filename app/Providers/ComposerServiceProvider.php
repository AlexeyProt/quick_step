<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\ViewComposers\MenuComposer;
use App\Http\ViewComposers\CategoriesComposer;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer(['includes.mobileMenu', 'includes.horMenu', 'includes.horMenu2', 'includes.sidebar', 'includes.footer'], MenuComposer::class);
		view()->composer(['editor.includes.menuItems'], CategoriesComposer::class);		
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
