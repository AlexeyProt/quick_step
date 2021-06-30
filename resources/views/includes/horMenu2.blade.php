<div class="horMenuContainer">
	<div>
		<div>
			<svg style="position: absolute;width: 0;height: 0;left: 0;top: 0;">
				<defs>
					<linearGradient id="menuGradient" x1="50%" x2="50%" y1="0%" y2="100%">
						<stop offset="0" stop-color="white" stop-opacity="0.9"></stop>
						<stop offset="1" stop-opacity="0.9" stop-color="#ddd"></stop>
					</linearGradient>
					<linearGradient x1="50%" x2="50%" y1="0%" y2="100%" id="menuGradient2">
						<stop offset="0" stop-color="white" stop-opacity="0.9"></stop>
						<stop offset="1" stop-opacity="0.9" stop-color="#7d7d7d"></stop>
					</linearGradient>
					<mask id="menuMask" maskContentUnits="objectBoundingBox">
						<rect y="0" fill="white" ry="0.05" rx="0.1" width="1" height="1"></rect>
					</mask>
					<rect height="8" fill="url(#menuGradient2)" id="bottom" width="100%" y="0"></rect>
				</defs>
			</svg>
			<ul class="horMenu">
			<?php foreach( $menu_items2 as $parent) { ?>
						<li><a href="{{ url($parent->page->uri) }}">{{ $parent->name }}</a>
					<ul class="subMenu">
					<svg style="position: absolute;width: 100%;height: 100%;left: 0;top: 0;">
						<g mask="url(#menuMask)">
							<rect fill="url(#menuGradient)" ry="0" rx="0" y="0" height="100%" width="100%"></rect>
							<use href="#bottom" y="0"></use>
						</g>
					</svg>

					</ul>
				</li>
			<?php } ?>
				<li style="display:none;"><a href="{{ url('aktsyya') }}"><img style="height: 47px;vertical-align: middle;" src="{{ asset('images/aktsyya.svg') }}"></a></li>
			</ul>
			<div>@include('includes.searchForm')</div>
		</div>
	</div>
</div>