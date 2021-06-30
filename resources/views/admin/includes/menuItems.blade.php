<ul id="menuEditor" class="tree">
	<li class="create" data-sortable="after">Создать пункт меню</li>
	@php
		function buildMenuItems($items) {
			foreach($items as $item) {
				if (isset($item->children)) {
				@endphp
					<li data-menu_item-id="{{ $item->id }}" data-menu_item-page-id="{{ $item->page->id }}" data-sortable="true">
						<div data-tree="open">
							<div>+</div>
							<div class="childItemsCount">{{ $item->children->count() }}</div>
						</div>
						<div class="itemContainer">
							<div class="parentItem">						
								<div class="name">{{ $item->name }}</div>
								<a class="link" href="{{ url($item->page->uri) }}" target="_blank">/{{ $item->page->uri }}</a>
								<div class="icons">
									<div class="edit">@php include('images/editIcon.svg') @endphp</div>
									<div class="remove">@php include('images/deleteIcon.svg') @endphp</div>						
								</div>
							</div>
							<ul>
								<li class="create" data-sortable="after">Новый</li>
								@php buildMenuItems($item->children) @endphp
							</ul>
						</div>
					</li>
				@php
				} else {
				@endphp
					<li data-menu_item-id="{{ $item->id }}" data-menu_item-page-id="{{ $item->page->id }}" data-sortable="true">
						<div data-tree="open">
							<div>+</div>
							<div class="childItemsCount"></div>
						</div>
						<div class="itemContainer">
							<div class="parentItem">							
								<div class="name">{{ $item->name }}</div>
								<a class="link" href="{{ url($item->page->uri) }}" target="_blank">/{{ $item->page->uri }}</a>
								<div class="icons">
									<div class="edit">@php include('images/editIcon.svg') @endphp</div>
									<div class="remove">@php include('images/deleteIcon.svg') @endphp</div>						
								</div>
							</div>
							<ul>
								<li class="create" data-sortable="after">Новый</li>
							</ul>
						</div>
					</li>	
	@php
				}
			}
		}
		buildMenuItems($menu_items)
	@endphp	
	<div data-sortable="before"></div>
</ul>

<template id="menuItems">
	<li class="create" data-sortable="after">Создать пункт меню</li>
	<div data-sortable="before"></div>
</template>

<template id="menuItem">
	<li data-menu_item-id="" data-menu_item-page-id="" data-sortable="true">
		<div data-tree="open">
			<div>+</div>
			<div class="childItemsCount"></div>
		</div>
		<div class="itemContainer">
			<div class="parentItem">			
				<div class="name"></div>
				<a class="link" target="_blank"></a>
				<div class="icons">
					<div class="edit">@php include('images/editIcon.svg') @endphp</div>
					<div class="remove">@php include('images/deleteIcon.svg') @endphp</div>						
				</div>
			</div>
			<ul>
				<li class="create" data-sortable="after">Новый</li>
			</ul>
		</div>
	</li>	
</template>

<template id="buttons">
	<div>
		<span data-button="save" class="miniButton">Сохранить</span>
		<span data-button="cancel" class="miniButton">Отмена</span>
	</div>
</template>