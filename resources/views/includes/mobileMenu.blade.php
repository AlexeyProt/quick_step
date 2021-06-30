<div id="mobileMenu" class="scrollContainer" data-device="mobile">	
	<div class="headerMobileMenu">
		<div class="menuButtonContainer"> <?php include('images/menuButton.svg') ?> </div>
		<span class="titleMobileMenu">
			<div>
				<a href="{{ url('') }}">
					<img src="{{ asset('images/logo.png') }}" style="width:75px; border:none;">
				</a>
			</div>
		</span>
	</div>
	<div class="mobileMenuContainer">
		<div class="mobileMenuBackground"></div>
		<ul class="mobileList">
		<?php foreach( $menu_items2 as $parent) { ?>			
			<li><a href="{{ url($parent->page->uri) }}"><?php echo $parent->name ?><div class="forwardButton"></div></a></li>
		<?php } ?>			
		<?php foreach( $menu_items as $parent) { ?>			
			<li><a href="{{ url($parent->page->uri) }}"><?php echo $parent->name ?><div class="forwardButton"></div></a></li>
		<?php } ?>	
		</ul>
		<div class="headerMobileMenuContainer">

		</div>
	</div>
</div>