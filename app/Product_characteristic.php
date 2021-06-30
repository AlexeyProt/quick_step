<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_characteristic extends Model
{
	public $timestamps = false;
	
    public $primaryKey = 'product_id';
	
	public $incrementing = false;	
	
	protected $guarded = [];	
	
    public function characteristic() {
		return $this->belongsTo('App\Characteristic');
	}	
}
