<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Menu_item extends Model
{
    protected $fillable = [
        'parent_id',
        'name',
        'page_id',
		'sort_order'
    ];	
	
    public $timestamps = false;		
	
	protected static function boot() {
		parent::boot();
		
		static::addGlobalScope('sort_order', function (Builder $builder) {
			$builder->orderBy('sort_order');
		});
	}
	
    public function page() {
		return $this->belongsTo('App\Page');
	}	
}
