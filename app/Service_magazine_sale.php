<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service_magazine_sale extends Model
{
	public $timestamps = false;
	
	protected $guarded = ['service_price_history_id'];
	
    public function sales() {
		return $this->belongsTo('App\Sale', 'sale_id', 'sale_id');
	}
	
    public function service() {
		return $this->belongsTo('App\Service');
	}	
	
    public function service_price_history() {
		return $this->belongsTo('App\service_price_history');
	}
}
