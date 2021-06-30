<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page_view extends Model
{
    public $primaryKey = 'page_id';
	
	public $incrementing = false;
	
	public function page() {
		return $this->belongsTo('App\Page', 'page_id');
	}
}
