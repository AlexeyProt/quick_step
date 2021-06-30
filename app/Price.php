<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
	public $incrementing = false;
	
	public $timestamps = false;
	
	public $primaryKey = 'product_id';
	
	protected $guarded = [];
	
    public function price_history() {
		return $this->belongsTo('App\Price_history');
	}	
	
	public function getPriceAttribute() {
		return $this->price_history->price;
	}
}
