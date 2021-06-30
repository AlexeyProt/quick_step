<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    public function page_routes() {
		return $this->hasMany('App\Page_route');
	}
}
