<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Menu_category extends Model
{
	protected static function boot() {
		parent::boot();
		
		static::addGlobalScope('sort', function (Builder $builder) {
			$builder->orderBy('sort');
		});
	}
}
