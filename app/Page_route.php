<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page_route extends Model
{
	public $timestamps = false;	
	
	protected $guarded = [];	
	
	public $primaryKey = 'page_id';
	
	
    public function route() {
		return $this->belongsTo('App\Route');
	}
	
	public function page() {
		return $this->hasOne('App\Page', 'page_id');
	}
	
    public function page_parameters() {
		return $this->hasMany('App\Page_parameter', 'page_id', 'page_id');
	}	
}
