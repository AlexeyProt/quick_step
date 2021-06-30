<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group_product extends Model
{
	public $incrementing = false;
	
	public $timestamps = false;
	
	public $primaryKey = 'product_id';
	
	protected $guarded = [];	
	
    public function product_group() {
		return $this->belongsTo('App\Product_group');
	}	
	
    public function product() {
		return $this->belongsTo('App\Product');
	}
}
