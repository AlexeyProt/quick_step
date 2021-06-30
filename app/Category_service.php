<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category_service extends Model
{
	public $incrementing = false;
	
	public $timestamps = false;
	
	public $primaryKey = 'category_id';
	
	protected $guarded = [];	
	
	public function service() {
		return $this->belongsTo('App\Service');
	}
	
	public function category() {
		return $this->belongsTo('App\Category');
	}	
}
