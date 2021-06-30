<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;

class TreeService
{
    /**
     * Возвращает древовидную коллекцию
     *
     * @param  \Illuminate\Database\Eloquent\Collection  $items
	 * @param int $parent_id id родительской коллекции
     * @return \Illuminate\Database\Eloquent\Collection
     */		
    public function build(Collection $items, $parent_id=null) {		
		$grouped = $items->groupBy('parent_id');
		
		foreach($items as $item) {
			if ($grouped->has($item->id)) $item->children = $grouped[$item->id];
		}
		
		return $items->where('parent_id', $parent_id);		
	}
	
    /**
     * Возвращает древовидную коллекцию
     * Устанавливает активному элементу свойсво active а его родительским элементам свойсва active_child
	 *
     * @param  \Illuminate\Database\Eloquent\Collection  $items
	 * @param int $active_id id активного элемента
	 * @param int $parent_id id родительской коллекции
     * @return \Illuminate\Database\Eloquent\Collection
     */			
    public function buildNavigation(Collection $items, $active_id=null, $parent_id=null) {		
		$items = $items->keyBy('id');
		
		if (!isset($items[$active_id])) return $this->build($items, $parent_id);
		
		$items[$active_id]->active = true;
		
		for ($target = $items[$active_id]; ; $target = $items[$target->parent_id]) {
			if (!$target->active) $target->active_child = true;
			
			if (!$target->parent_id) break;
		}
		
		return $this->build($items, $parent_id);
	}	
}
