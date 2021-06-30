<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 36" id="<?php echo $id['svg'] ?>" class="openButton">
	<defs>
		<style>
			.openButton{display:block;width:330px;height=36px;margin:auto;cursor:pointer;}
			.blackText_<?php echo $id['svg'] ?>{stroke:#000;stroke-width:0px;fill:url(#buttonGradient_<?php echo $id['svg'] ?>);}
			.blackText_<?php echo $id['svg'] ?>,.whiteText_<?php echo $id['svg'] ?>{stroke-miterlimit:10;font-size:24px;font-family:Impact, fantasy;text-anchor:middle;}
			.whiteText_<?php echo $id['svg'] ?>{fill:none;stroke:url(#strokeGradient_<?php echo $id['svg'] ?>);stroke-width:1px;}
		</style>
		<radialGradient id="buttonGradient_<?php echo $id['svg'] ?>" cx="50%" cy="50%" r="0%" gradientUnits="userSpaceOnUse">
			<stop offset="0" stop-color="#ff2a2a"/><stop offset="0.59" stop-color="#e11f1f"/>
			<stop offset="1" stop-color="#000000" stop-opacity="1"/>
		</radialGradient>
		<linearGradient gradientUnits="userSpaceOnUse" id="strokeGradient_<?php echo $id['svg'] ?>" y1="0" y2="0" x2="60%" x1="40%">
			<stop offset="0" stop-opacity="1" stop-color="gray"></stop>
			<stop stop-color="white" stop-opacity="1" offset="0.5"></stop>
			<stop stop-opacity="1" stop-color="gray" offset="1"></stop>
		</linearGradient>
	</defs>
	<text class="blackText_<?php echo $id['svg'] ?>" y="50%" x="50%" dy="8"><?php echo $contentElem ?></text>
	<text class="whiteText_<?php echo $id['svg'] ?>" y="50%" x="50%" dy="8"><?php echo $contentElem ?></text>
</svg>