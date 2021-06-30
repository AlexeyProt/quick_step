		<?php include('images/openClose.svg') ?>
		<div class="scrollContainer" id="feedbackContainer">
		<div class="formContainer">
			<?php include('images/light.svg') ?>
			<div class="formInnerContainer">
				<form class="feedback">
					<?php include('images/formBackground.svg') ?>
					<div class="formContent">
						<?php include('images/close.svg') ?>
						<span class="caption">Заказать звонок</span>
						<label>
							<input type="text" name="name" placeholder="Имя">
						</label>
						<label>
							<input type="text" name="phone" placeholder="Телефон">
						</label>
						@include('includes/recaptchaNotice')
						<p class="notice">После получения заявки, наши специалисты свяжутся с Вами в ближайшее время.</p>	
						<div class="button" data-button="feedback">
							<div class="innerContainer">Заказать звонок</div>
						</div>					
					</div>
					<input type="hidden" name="recaptcha_response" id="recaptchaResponse">					
				</form>		
			</div>
		</div>
		</div>