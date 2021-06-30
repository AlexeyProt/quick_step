<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category_characteristic extends Model
{
	public $timestamps = false;
	
    public $primaryKey = 'category_id';
	
	public $incrementing = false;	
	
	protected $guarded = [];	
	
    public function characteristic() {
		return $this->belongsTo('App\Characteristic');
	}
}
