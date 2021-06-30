<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Page extends Model
{
	protected $guarded = [];	
	
	protected $attributes = [
		'published' => 0,
	];
	
	protected static function boot() {
		parent::boot();
		
		static::addGlobalScope('published', function (Builder $builder) {
			$builder->where('published', 1);
		});
	}
	
	public function page_view() {
		return $this->hasOne('App\Page_view');
	}
	
/* 	public function products() {
		return $this->hasManyThrough('App\Product', 'App\Product_view');
	}	 */
	
 	public function product_view() {
		return $this->hasOne('App\Product_view');
	}	
	
 	public function laminate_products_view() {
		return $this->hasOne('App\Laminate_product_view');
	}		
	
	public function products_view() {
		return $this->hasOne('App\Products_view');
	}	
	
 	public function product_group_view() {
		return $this->hasOne('App\Product_group_view');
	}	
	
	public function categories_view() {
		return $this->hasOne('App\Categories_view');
	}		
	
	public function page_route() {
		return $this->hasOne('App\Page_route');
	}		
	
	public function page_parameter() {
		return $this->hasOne('App\Page_parameter');
	}			
}
