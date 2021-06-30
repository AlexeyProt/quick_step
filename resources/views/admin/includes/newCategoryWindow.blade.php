		<?php include('images/openClose.svg') ?>
		<div class="scrollContainer" id="newCategoryWindow">
		<div class="formContainer">
			<?php include('images/light.svg') ?>
			<div class="formInnerContainer">
				<form name="newCategoryWindow" class="window">
					<?php include('images/formBackground.svg') ?>
					<div class="formContent">
						<?php include('images/close.svg') ?>
						<span class="caption">Название категории</span>
						<input type="hidden" name="parentId">
						<input name="name">
						<div class="buttons">
							<p class="notice"></p>	
							<div class="button" data-button="confirm">
								<div class="innerContainer">Подтвердить</div>
							</div>
							<div class="button" data-button="cancel">
								<div class="innerContainer">Отмена</div>
							</div>	
						</div>
					</div>
				</form>
			</div>
		</div>
		</div>