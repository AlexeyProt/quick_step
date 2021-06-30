<div class="sidebar" data-device="decktop">
	@php include('images/background.svg') @endphp
	<ul>	
		<li><a href="{{ route('admin::orders') }}">Заказы<div class="forwardButton"></div></a></li>
		<li><a href="{{ route('admin::pages') }}">Страницы<div class="forwardButton"></div></a></li>		
		<ul>
			<li><a href="{{ route('admin::pageCreate') }}">Добавить страницу<div class="forwardButton"></div></a></li>	
		</ul>		
		<li><a href="{{ route('admin::pagesViews') }}">Шаблоны страниц<div class="forwardButton"></div></a></li>		
		<li><a href="{{ route('admin::products') }}">Товары<div class="forwardButton"></div></a></li>	
		<ul>
			<li><a href="{{ route('admin::productCreate') }}">Добавить товар<div class="forwardButton"></div></a></li>	
			<li><a href="{{ route('admin::productCreatePlinth') }}">Добавить плинтус<div class="forwardButton"></div></a></li>	
			<li><a href="{{ route('admin::productCreateSubstrate') }}">Добавить подложку<div class="forwardButton"></div></a></li>	
		</ul>
		<li><a href="{{ route('admin::productShowGroupProducts') }}">Товары для групп<div class="forwardButton"></div></a></li>		
		<ul>
			<li><a href="{{ route('admin::productCreateForGroup') }}">Добавить товар для группы<div class="forwardButton"></div></a></li>	
		</ul>		
		<li><a href="{{ route('admin::productGroups') }}">Группы товаров<div class="forwardButton"></div></a></li>	
		<ul>
			<li><a href="{{ route('admin::productGroupCreate') }}">Добавить группу товаров<div class="forwardButton"></div></a></li>	
		</ul>
		<li><a href="{{ route('admin::services') }}">Услуги<div class="forwardButton"></div></a></li>	
		<ul>
			<li><a href="{{ route('admin::serviceCreate') }}">Добавить услугу<div class="forwardButton"></div></a></li>	
		</ul>		
		<li><a href="{{ route('admin::categories') }}">Категории<div class="forwardButton"></div></a></li>	
		<li><a href="{{ route('admin::menu_categories') }}">Меню<div class="forwardButton"></div></a></li>	
		<li><a href="{{ route('admin::menu_items') }}">Меню страниц<div class="forwardButton"></div></a></li>	
		<li><a href="{{ route('admin::showForm') }}">Парсинг изображений<div class="forwardButton"></div></a></li>	
		<li><a href="{{ route('admin::parseCollectionForm') }}">Парсинг коллекции<div class="forwardButton"></div></a></li>	
	</ul>
</div>		