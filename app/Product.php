<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
	protected $guarded = [];
	
	protected $appends = ['image'];

    public function category() {
		return $this->belongsTo('App\Category');
	}
	
    public function unit() {
		return $this->belongsTo('App\Unit');
	}	
	
    public function product_stock() {
		return $this->hasOne('App\Product_stock');
	}	
	
    public function price() {
		return $this->hasOne('App\Price');
	}
	
    public function price_history() {
		return $this->hasMany('App\Price_history');
	}	
	
    public function product_images() {
		return $this->hasMany('App\Product_image');
	}	
	
	public function product_view() {
		return $this->hasOne('App\Product_view');
	}	
	
	public function plinth_view() {
		return $this->hasOne('App\Plinth_view');
	}		
	
	public function laminate_products_view() {
		return $this->hasOne('App\Laminate_product_view');
	}			
	
	public function group_product() {
		return $this->hasOne('App\Group_product');
	}		
	
	public function promotional_product() {
		return $this->hasOne('App\Promotional_product');
	}			
	
	public function page_parameters() {
		return $this->morphMany('App\Page_parameter', 'parameterizable');
	}		
	
    public function product_characteristics() {
		return $this->hasMany('App\Product_characteristic');
	}		
	
	public function getImageAttribute() {
		if ($image = $this->product_images->first()) return $image->name;
	}	
}
