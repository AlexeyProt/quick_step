<?php include('images/openClose.svg') ?>
<div id="@yield('windowId')" class="hidden">
	<?php include('images/light.svg') ?>
	<div class="scrollContainer">
		<div class="formContainer">		
			<div class="formInnerContainer">
				<form name="@yield('windowNameForm')" class="window">
					<?php include('images/formBackground.svg') ?>
					<div class="formContent">
						<?php include('images/close.svg') ?>
						<span class="caption">@yield('windowCaption')</span>
						<div>						
							@yield('windowContent')									
						</div>
						<div class="buttons">
							<p class="notice"></p>
							@section('windowButtons')
								<div class="button" data-button="confirm">
									<div class="innerContainer">Подтвердить</div>
								</div>
								<div class="button" data-button="cancel">
									<div class="innerContainer">Отмена</div>
								</div>	
							@show
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>