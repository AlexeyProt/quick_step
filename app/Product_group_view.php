<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_group_view extends Model
{
	public $timestamps = false;		
	
    public $primaryKey = 'page_id';
	
	public $incrementing = false;
	
	protected $guarded = [];		
	
	public function product_group() {
		return $this->belongsTo('App\Product_group');
	}
	
	public function page() {
		return $this->belongsTo('App\Page', 'page_id');
	}	
}
