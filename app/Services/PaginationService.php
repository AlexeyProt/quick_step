<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use App\Utilities\LengthAwarePaginator;
use Illuminate\Container\Container;
use Illuminate\Support\Facades\DB;

class PaginationService
{
	public $builders = [];
	
	public function addBuilder($builder) {
		$this->builders[] = $builder;
	}
    /**
     * Paginate the given query into a simple paginator.
     *
     * @param  int  $perPage
     * @param  array  $columns
     * @param  string  $pageName
     * @param  int|null  $page
     * @param  int|null  $path путь первой страницы пагинации
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate($perPage = 15, $columns = ['*'], $pageName = 'page', $page = null, $path = null)
    {
        $page = $page ?: Paginator::resolveCurrentPage($pageName);
		$path = $path ?: Paginator::resolveCurrentPath();
	
        $total = 0;
		$builder = $this->builders[0];
		// К первому запросу добавляются следующие запросы с помощью UNION ALL
		for($i = 0, $size = count($this->builders); $i < $size; ++$i) {
			// Количество строк в запросе
			$count = DB::table(DB::raw("({$this->builders[$i]->toSql()}) as sub"))
						->mergeBindings($this->builders[$i]->toBase())->count();
			$total += $count;
			if ($i === 0) continue;
			$builder->unionAll($this->builders[$i]);
		}
		
        $results = $total ? $builder->forPage($page, $perPage)->get($columns) : collect();		

        return $this->paginator($results, $total, $perPage, $page, [
            'path' => $path,
            'pageName' => $pageName,
        ]);
    }
	
    /**
     * Create a new length-aware paginator instance.
     *
     * @param  \Illuminate\Support\Collection  $items
     * @param  int  $total
     * @param  int  $perPage
     * @param  int  $currentPage
     * @param  array  $options
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    protected function paginator($items, $total, $perPage, $currentPage, $options)
    {
        return Container::getInstance()->makeWith(LengthAwarePaginator::class, compact(
            'items', 'total', 'perPage', 'currentPage', 'options'
        ));
    }
}
