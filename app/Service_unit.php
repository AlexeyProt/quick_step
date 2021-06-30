<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service_unit extends Model
{
	public $timestamps = false;
	
    public $primaryKey = 'service_id';
	
	public $incrementing = false;	
	
	protected $guarded = [];	
	
    public function unit() {
		return $this->belongsTo('App\Unit');
	}	
}
