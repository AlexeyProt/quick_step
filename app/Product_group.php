<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_group extends Model
{
	protected $guarded = [];
	
	protected $appends = ['image'];

    public function category() {
		return $this->belongsTo('App\Category');
	}
	
    public function product_group_images() {
		return $this->hasMany('App\Product_group_image');
	}	
	
    public function group_products() {
		return $this->hasMany('App\Group_product');
	}		
	
	public function product_group_view() {
		return $this->hasOne('App\Product_group_view');
	}		
	
	public function getImageAttribute() {
		if ($image = $this->product_group_images->first()) return $image->name;
	}		
}
