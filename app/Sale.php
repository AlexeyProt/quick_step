<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Sale extends Model
{
	public $timestamps = false;
	
	const CREATED_AT = 'added_on';
	
	public function getDates() {
		return ['added_on'];
	}
	
	protected static function boot() {
	parent::boot();

	static::addGlobalScope('saleSort', function (Builder $builder) {
			$builder->orderBy('id', 'desc');
		});	  
	}
	
	
    public function customer() {
		return $this->belongsTo('App\Customer');
	}
	
    public function magazine_sales() {
		return $this->hasMany('App\Magazine_sale', 'sale_id');
	}	
	
    public function service_magazine_sales() {
		return $this->hasMany('App\Service_magazine_sale', 'sale_id');
	}		
	
    public function sale_status() {
		return $this->hasOne('App\Sale_status', 'sale_id');
	}		
	
	public function getAddedOnAttribute($value) {
		return \Carbon\Carbon::parse($value)->format('H:i / d.m.Y');
	}	
	
	public function getDeliveryPrice() {
		if ($this->customer->adres) return \App\Service::where('name', 'Доставка')->firstOrFail()->service_price->price;
	}
	
	public function getTotalAmount() {
		$totalAmount = 0;
		foreach ($this->magazine_sales as $magazine_sale) {
			$totalAmount += $magazine_sale->price_history->price * $magazine_sale->quantity;
		}
		return $totalAmount;
	}	
}
