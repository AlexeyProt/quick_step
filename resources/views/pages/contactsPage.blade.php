@extends('layouts.default')

<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@section('content')
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
<script src="{{ asset('js/views/pageView.js') }}" defer></script>
<div class="content">
@include('includes.imageShowMobile')
	{!! $page->content !!}
	<div id="map"></div>
	<script type="text/javascript">
    ymaps.ready(init);
    var myMap,
	myPlacemark;
	
    function init(){     
        myMap = new ymaps.Map("map", {
            center: [59.898995, 30.419911],
            zoom: 16
        });
		myPlacemark = new ymaps.Placemark([59.898995, 30.419911], { hintContent: 'Ламинат', balloonContent: 'Ламинат' });
		myMap.geoObjects.add(myPlacemark);
    }
</script>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection