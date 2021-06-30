<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plinth_view extends Model
{
 	public $timestamps = false;		
	
    public $primaryKey = 'page_id';
	
	public $incrementing = false;
	
	protected $guarded = [];		
	
	public function product() {
		return $this->belongsTo('App\Product');
	}
	
	public function page() {
		return $this->belongsTo('App\Page', 'page_id');
	}	
}
