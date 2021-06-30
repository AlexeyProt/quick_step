<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category_price extends Model
{
	public $incrementing = false;
	
	public $timestamps = false;
	
	const CREATED_AT = 'actual_on';	
	
	public $primaryKey = 'category_id';
	
	protected $guarded = [];
	
	public function setPriceAttribute($value) {
		return $this->attributes['price'] = (int) round(str_replace(',','.',$value)*100, 0, PHP_ROUND_HALF_UP);
	}
	
	public function getPriceAttribute($value) {
		return (int) $value/100;
	}	
}
