<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class Menu_categoryService
{
    public function getTree($table='menu_categories') {
		$conn = DB::connection()->getPdo();
		$query = $conn->query("SELECT * FROM $table ORDER BY sort");
		$menu_categories = [];
		while( $row = $query->fetch() ) {
			$menu_categories[$row['parent_id']][$row['id']] = (object) $row;
		};
		return collect($menu_categories);
	}
}
