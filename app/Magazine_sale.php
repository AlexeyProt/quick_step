<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Magazine_sale extends Model
{
	public $timestamps = false;
	
	protected $guarded = ['price_history_id'];
	
    public function sales() {
		return $this->belongsTo('App\Sale', 'sale_id', 'sale_id');
	}
	
    public function product() {
		return $this->belongsTo('App\Product');
	}	
	
    public function price_history() {
		return $this->belongsTo('App\Price_history');
	}	
}
