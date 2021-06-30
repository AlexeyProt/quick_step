		<?php include('images/openClose.svg') ?>
		<div class="scrollContainer" id="cartFloorWindow">
		<div class="formContainer">
			<?php include('images/light.svg') ?>
			<div class="formInnerContainer">
				<form name="confirmation" class="window">
					<?php include('images/formBackground.svg') ?>
					<div class="formContent">
						<?php include('images/close.svg') ?>
						<span class="caption">Товар добавлен в корзину</span>
						<div class="table" data-cart-window="id">
							<div><img data-cart-window="image" src="" style="width: 100px;"></div>
							<div data-cart-window="name">Название товара</div>
							<div><span data-cart-window="price">0</span><span> руб.</span></div>
							<div class="quantityVidjet">
								<span>-</span>
								<span data-cart-window="quantity" data-module="quantityVidjet" contenteditable="true">1</span>
								<span>+</span>
							</div>
						</div>
						<p>В наличии <span data-cart-window="product_stock">0</span> шт.</p>
						
						@include('includes.floor')
						
						<div class="buttons">
							<p class="notice">Продолжить покупки?</p>	
							<div class="button" data-button="confirm">
								<div class="innerContainer">Продолжить</div>
							</div>
							<div class="button" data-button="cancel">
								<div class="innerContainer">Перейти в корзину</div>
							</div>	
						</div>
					</div>
				</form>
			</div>
		</div>
		</div>