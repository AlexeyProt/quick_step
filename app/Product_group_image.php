<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Product_group_image extends Model
{
	public $incrementing = false;
	
	public $timestamps = false;
	
	public $primaryKey = 'product_group_id';
	
	protected $guarded = [];
	
	protected $attributes = [
		'level' => 0,
	];

	protected static function boot() {
		parent::boot();		
		
		static::addGlobalScope('level', function (Builder $builder) {
			$builder->orderBy('level');
		});		
	}	
}
