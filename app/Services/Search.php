<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;

class Search
{
	/**
	 * Возвращает модели по запросу $searchQuery в столбце $column
	 *
	 * @param \Illuminate\Database\Eloquent\Builder $builder
	 * @param string $column
	 * @param string $searchQuery
	 * @return \Illuminate\Support\Collection
	 */
    public function find(Builder $builder, $column, $searchQuery)
	{
		$words = explode(' ', $searchQuery);
		
		foreach ($words as $word) {
			$builder->where($column, 'like', "%{$word}%");
		}
		
		return $builder->get();		
	}
}
