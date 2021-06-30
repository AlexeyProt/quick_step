<ul id="filter" class="tree">
	<li class="edit" data-sortable="true">
		<div class="droppedCont">
			<span data-tree="open">+</span>
			<div class="catalogCont">
				<div class="catalogIcon"></div>
				<span class="name" data-tree-selected="true">Класс</span>	
			</div>
		</div>														
	<ul data-filter-characteristic="класс">
		<li class="edit" data-sortable="true">
			<input type="checkbox" name="класс" value="32"><span class="name">32</span>
		</li>	
		<li class="edit"data-sortable="true">
			<input type="checkbox" name="класс" value="33"><span class="name">33</span>
		</li>				
	</ul>
	</li>

	<li class="edit" data-sortable="true">
		<div class="droppedCont">
			<span data-tree="open">+</span>
			<div class="catalogCont">
				<div class="catalogIcon"></div>
				<span class="name" data-tree-selected="true">Толщина</span>	
			</div>
		</div>														
	<ul data-filter-characteristic="толщина">
		<li class="edit" data-sortable="true">
			<input type="checkbox" name="толщина" value="8"><span class="name">8</span>
		</li>	
		<li class="edit" data-sortable="true">
			<input type="checkbox" name="толщина" value="9"><span class="name">9</span>
		</li>	
		<li class="edit" data-sortable="true">
			<input type="checkbox" name="толщина" value="9.5"><span class="name">9.5</span>
		</li>		
		<li class="edit" data-sortable="true">
			<input type="checkbox" name="толщина" value="12"><span class="name">12</span>
		</li>				
	</ul>
	</li>	
</ul>


<div>
	@include('includes.productsList')

	<div class="progressContainer"></div>
	{{ $products->links() }}
	<template id="pagination">
		<ul class="pagination">
			
		</ul>
	</template>		
</div>
	

@php 
/* 	preg_match_all('#/categories/(?P<categories>[^/]+)|/characteristics/(?P<characteristics>(.+)=(\w+)(&&(\w+))*)#', '/products/filter/characteristics/class=32&&33&&34', $matches);
	
	var_dump($matches); */
	
/* 	preg_match_all('#(\d+)#', '/products/filter/characteristics/class=32&&33&&34', $matches);
	
	var_dump($matches);	 */
	
/* 	preg_match_all('#/categories/(?P<categories>[^/]+)|/characteristics/(?P<characteristics>(.+)=(\d+)&&(\d+)&&(\d+))#', '/products/filter/characteristics/class=32&&33&&34', $matches);
	
	var_dump($matches);	 */
	
/* 	preg_match_all('#/categories/(?P<categories>[^/]+)|/characteristics/(?P<characteristics>.+)#ui', '/products/filter/categories/laminate/characteristics/class=32&&33&&34/charact=char1&&char2&&char3', $matches);
	var_dump($matches);		
	$characteristics = $matches['characteristics'][0];
	
	preg_match_all('#(?P<characteristics>[^=/]+)=(?P<values>[^/]+)#ui', 'class=32&&33&&34/charact=char1&&char2&&char3', $matches);
	
	var_dump($matches);		 */
	
	
@endphp