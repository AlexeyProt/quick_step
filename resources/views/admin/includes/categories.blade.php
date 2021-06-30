<ul id="categories" class="tree">
	<li class="create" data-sortable="after">Создать категорию</li>
	@php
		function buildCategories($items) {
			foreach($items as $item) {
				if (isset($item->children)) {
				@endphp
					<li data-category-id="{{ $item->id }}" data-sortable="true">
						<span data-tree="open">+</span>
						<span class="name">{{ $item->name }}</span>							
						<span class="edit"><strong>ред.</strong></span>
						<ul>
							<li class="create" data-sortable="after">Новая</li>
							@php buildCategories($item->children) @endphp
						</ul>
					</li>
				@php
				} else {
				@endphp
					<li data-category-id="{{ $item->id }}" data-sortable="true">
						<span data-tree="open">+</span>
						<span class="name">{{ $item->name }}</span>
						<span class="edit"><strong>ред.</strong></span>	
						<ul>
							<li class="create" data-sortable="after">Новая</li>
						</ul>
					</li>	
	@php
				}
			}
		}
		buildCategories($categories)
	@endphp		
</ul>

<template id="categoryItem">
	<li data-category-id="" data-sortable="true">
		<span data-tree="open">+</span>
		<span class="name"></span>
		<span class="edit"><strong>ред.</strong></span>	
		<ul>
			<li class="create" data-sortable="after">Новая</li>
		</ul>
	</li>	
</template>