<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
	protected $guarded = [];
	
    public function sales() {
		return $this->hasMany('App\Sale');
	}
	
	public function setPhoneAttribute($value) {
		$this->attributes['phone'] = (int) preg_replace('/\D/', '', $value);
	}
	public function getPhoneAttribute($value) {
		return preg_replace( '/(\d)(\d{3})(\d{3})(\d{4})/', '+$1 ($2) $3 $4', $value);
	}	
}
