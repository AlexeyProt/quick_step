<div class="sidebar" data-device="decktop">
	@php include('images/sidebarBG.svg') @endphp
	<a href="{{ url('') }}">@php include('images/cnc-world.svg') @endphp</a>
	<ul>	
		@foreach ($menu_items as $parent)
			<li><a href="{{ route('page', $parent->link) }}">{{ $parent->title }}<div class="forwardButton"></div></a></li>			
				@if ( isset($menu_items[$parent->id]) )
					<ul>
						@foreach( $menu_items[$parent->id] as $child )
							<li><a href="{{ route('page', $child->link) }}">{{ $child->title }}<div class="forwardButton"></div></a></li>	
						@endforeach
					</ul>
				@endif
		@endforeach
	</ul>
</div>		