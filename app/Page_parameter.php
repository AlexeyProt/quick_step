<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page_parameter extends Model
{
    public function parameterizable() {
		return $this->morphTo();
	}
}
