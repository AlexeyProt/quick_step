<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Category extends Model
{
	public $timestamps = false;	
	
	protected $guarded = [];
	
	protected $attributes = [
		'published' => 0,
	];	
	
	protected static function boot() {
		parent::boot();
		
		static::addGlobalScope('published', function (Builder $builder) {
			$builder->where('published', 1);
		});
		
		static::addGlobalScope('sort', function (Builder $builder) {
			$builder->orderBy('sort');
		});		
	}	
	
	public function products() {
		return $this->hasMany('App\Product');
	}
	
	public function products_view() {
		return $this->hasOne('App\Products_view');
	}

	public function categories_view() {
		return $this->hasOne('App\Categories_view');
	}
	
    public function category_image() {
		return $this->hasOne('App\Category_image');
	}		
	
    public function category_characteristics() {
		return $this->hasMany('App\Category_characteristic');
	}		

    public function category_price() {
		return $this->hasOne('App\Category_price');
	}		
	
    public function category_services() {
		return $this->hasMany('App\Category_service');
	}		
}
