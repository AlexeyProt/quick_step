<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Products_view extends Model
{
	public $timestamps = false;		
	
    public $primaryKey = 'page_id';
	
	public $incrementing = false;	
	
	protected $guarded = [];			
	
	public function category() {
		return $this->belongsTo('App\Category');
	}
	
	public function page() {
		return $this->belongsTo('App\Page', 'page_id');
	}	
}
