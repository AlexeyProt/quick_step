<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale_status extends Model
{
	public $timestamps = false;	
	
	protected $attributes = [
		'status_id' => 1,
	];	
	
    public function status() {
		return $this->belongsTo('App\Status');
	}	
}
