<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service_price extends Model
{
	public $incrementing = false;
	
	public $timestamps = false;
	
	public $primaryKey = 'service_id';
	
	protected $guarded = [];
	
    public function service_price_history() {
		return $this->belongsTo('App\Service_price_history');
	}	
	
	public function getPriceAttribute() {
		return $this->service_price_history->price;
	}
}
