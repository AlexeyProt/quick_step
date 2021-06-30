<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category_image extends Model
{
	public $incrementing = false;
	
	public $timestamps = false;
	
	public $primaryKey = 'category_id';
	
	protected $guarded = [];
}
