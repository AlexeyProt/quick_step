<ul id="menuEditor" class="tree">
	<li class="create" data-sortable="after">Создать категорию</li>
	@php
		function buildMenuCategories($items) {
			foreach($items as $item) {
				if (isset($item->children)) {
				@endphp
					<li data-menu_category-id="{{ $item->id }}" data-sortable="true">
						<span data-tree="open">+</span>
						<div class="itemContainer">
							<div class="parentItem">						
								<div class="name">{{ $item->title }}</div>
								<a class="link" href="{{ url($item->link) }}" target="_blank">/{{ $item->link }}</a>
								<div class="edit"><strong>ред.</strong></div>
							</div>
							<ul>
								<li class="create" data-sortable="after">Новая</li>
								@php buildCategories($item->children) @endphp
							</ul>
						</div>
					</li>
				@php
				} else {
				@endphp
					<li data-menu_category-id="{{ $item->id }}" data-sortable="true">
						<span data-tree="open">+</span>
						<div class="itemContainer">
							<div class="parentItem">							
								<div class="name">{{ $item->title }}</div>
								<a class="link" href="{{ url($item->link) }}" target="_blank">/{{ $item->link }}</a>
								<div class="edit"><strong>ред.</strong></div>	
							</div>
							<ul>
								<li class="create" data-sortable="after">Новая</li>
							</ul>
						</div>
					</li>	
	@php
				}
			}
		}
		buildMenuCategories($menu_categories)
	@endphp	
	<div data-sortable="before"></div>
</ul>

<template id="categoryItem">
	<li data-menu_category-id="" data-sortable="true">
		<span data-tree="open">+</span>
		<div class="itemContainer">
			<div class="parentItem">			
				<div class="name"></div>
				<a class="link" target="_blank"></a>
				<div class="edit"><strong>ред.</strong></div>	
			</div>
			<ul>
				<li class="create" data-sortable="after">Новая</li>
			</ul>
		</div>
	</li>	
</template>