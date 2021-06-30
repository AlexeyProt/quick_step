<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
	protected $guarded = [];
	
    public function service_price() {
		return $this->hasOne('App\Service_price');
	}
	
    public function service_price_history() {
		return $this->hasMany('App\Service_price_history');
	}		
	
    public function service_unit() {
		return $this->hasOne('App\Service_unit');
	}	
}
