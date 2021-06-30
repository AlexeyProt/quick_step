<ul id="categories" class="tree">
	@php
		function buildCategories($items) {
			foreach($items as $item) {
				if (isset($item->children)) {
				@endphp
					@if ($item->active_child)
					<li class="edit" data-category-id="{{ $item->id }}" data-sortable="true" data-tree="dropped out">	
						<div class="droppedCont">
							<span data-tree="close" data-tree-child-selected="true">-</span>
							<div class="catalogCont">
								<div class="catalogIcon"></div>
								<span class="name">{{ $item->name }}</span>	
							</div>
						</div>
					@elseif ($item->active)	
						<li class="edit" data-category-id="{{ $item->id }}" data-sortable="true">
							<div class="droppedCont">
								<span data-tree="open">+</span>
								<div class="catalogCont">
									<div class="catalogIcon"></div>
									<span class="name" data-tree-selected="true">{{ $item->name }}</span>	
								</div>
							</div>
					@else
						<li class="edit" data-category-id="{{ $item->id }}" data-sortable="true">
							<div class="droppedCont">
								<span data-tree="open">+</span>
								<div class="catalogCont">
									<div class="catalogIcon"></div>
									<span class="name">{{ $item->name }}</span>	
								</div>
							</div>
					@endif																
						<ul>
							@php buildCategories($item->children) @endphp
						</ul>
					</li>
				@php
				} else {
				@endphp
					<li class="edit" data-category-id="{{ $item->id }}" data-sortable="true">
						@if ($item->active)
							<span class="name" data-tree-selected="true">{{ $item->name }}</span>	
						@else				
							<span class="name">{{ $item->name }}</span>								
						@endif
					</li>	
	@php
				}
			}
		}
		buildCategories($categories)
	@endphp		
</ul>