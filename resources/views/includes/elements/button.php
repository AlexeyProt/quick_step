<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 150 36" id="<?php echo $id['svg'] ?>" data-button="feedback" class="button">
	<defs>
		<style>
			.button{display:block;width:150px;height=36px;margin:auto;cursor:pointer;}
			.blackText_<?php echo $id['svg'] ?>{stroke:url(#buttonGradient_<?php echo $id['svg'] ?>);stroke-width:0.5;fill:#ff9600;}
			.blackText_<?php echo $id['svg'] ?>{stroke-miterlimit:10;font-size:24px;font-family:Arial;font-weight:bold;text-anchor:middle;}
		</style>
		<radialGradient id="buttonGradient_<?php echo $id['svg'] ?>" cx="50%" cy="50%" r="0%" gradientUnits="userSpaceOnUse">
			<stop offset="0" stop-color="#ffffff"/>
			<stop offset="1" stop-color="#000000" stop-opacity="1"/>
		</radialGradient>
	</defs>
	<text class="blackText_<?php echo $id['svg'] ?>" y="50%" x="50%" dy="8"><?php echo $contentElem ?></text>
</svg>