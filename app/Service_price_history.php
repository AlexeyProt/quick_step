<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service_price_history extends Model
{
	public $timestamps = false;
	
	const CREATED_AT = 'actual_on';	
	
	protected $fillable = ['service_id', 'price'];
	
	public function setPriceAttribute($value) {
		return $this->attributes['price'] = (int) round(str_replace(',','.',$value)*100, 0, PHP_ROUND_HALF_UP);
	}
	
	public function getPriceAttribute($value) {
		return (int) $value/100;
	}
}
