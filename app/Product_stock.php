<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_stock extends Model
{
	public $timestamps = false;
	
    public $primaryKey = 'product_id';
	
	public $incrementing = false;	
	
	protected $guarded = [];	
}
