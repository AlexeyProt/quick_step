		<div class="footer" data-device="decktopOff">
			<div class="innerContainer">
				<div>
					<div><strong>Телефоны</strong></div>
					<ul>
						<li>+7 (960) 243-23-82</li>
						<li>+7 (812) 365-41-80</li>
					</ul>
				</div>
				<div>
					<div><strong>Адрес</strong></div>
					<p>
						Санкт-Петербург<br>
						ул. Бабушкина д. 2<br>
						1-й этаж, «Паркет-Ламинат»
					</p>
				</div>	
				<div>
					<div><strong>Каталог</strong></div>
					<ul>
						@foreach( $menu_items2 as $parent)
							<li><a href="{{ url($parent->page->uri) }}">{{ $parent->name }}</a>
						@endforeach
					</ul>
				</div>	
				<div>
					<div><strong>Информация</strong></div>
					<ul>
						@foreach( $menu_items as $parent)
							<li><a href="{{ url($parent->page->uri) }}">{{ $parent->name }}</a>
						@endforeach
					</ul>
				</div>					
				<p>На этом сайте обрабатываются персональные данные в рамках <a href="{{ url('privacy-policy') }}">Политики в отношении
				обработки персональных данных</a>. Если Вы не согласны, то вправе покинуть сайт. 
				</p>
			</div>			
		</div>