<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Laminate_product_view extends Model
{
	public $timestamps = false;		
	
    public $primaryKey = 'page_id';
	
	public $incrementing = false;
	
	protected $guarded = [];		
	
	public function product() {
		return $this->belongsTo('App\Product', 'product_id');
	}
	
	public function category() {
		return $this->belongsTo('App\Category', 'category_id');
	}	
	
	public function page() {
		return $this->belongsTo('App\Page', 'page_id');
	}
}
