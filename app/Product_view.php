<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_view extends Model
{
	public $timestamps = false;		
	
    public $primaryKey = 'page_id';
	
	public $incrementing = false;
	
	protected $guarded = [];		
	
	public function product() {
		return $this->belongsTo('App\Product');
	}
	
	public function page() {
		return $this->belongsTo('App\Page');
	}	
	
	public function unit() {
		return $this->belongsTo('App\Unit');
	}		
}
