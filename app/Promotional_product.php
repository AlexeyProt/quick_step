<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promotional_product extends Model
{
	public $timestamps = false;
	
    public $primaryKey = 'product_id';
	
	public $incrementing = false;	
	
	protected $guarded = [];	
	
    public function product() {
		return $this->belongsTo('App\Product');
	}	
}
