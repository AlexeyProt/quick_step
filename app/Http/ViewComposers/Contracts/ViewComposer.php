<?php

namespace App\Http\ViewComposers\Contracts;

use Illuminate\View\View;

interface ViewComposer
{
    	public function compose(View $view);
}
