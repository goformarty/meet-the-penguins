function initMap() {
	console.log('Init map at London zoo');

	// Draw map centred in London Zoo
	var zoo = new google.maps.LatLng(51.535311, -0.153296);
	var mapOptions = {
		zoom: 12,
		center: zoo,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: stylesArray
	};
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	// Add custom penguin marker pin in London Zoo
	var pin = {
		url: 'img/PenguinMartyPin.svg',
		scaledSize: new google.maps.Size(48, 100)
	};
	var infowindow = new google.maps.InfoWindow({
		content: '<p style="font-size: 16px; margin-bottom: 0; padding: 10px 0 5px">Sqawk!</p>'
	});
	var marker = new google.maps.Marker({
		position: zoo,
		map: map,
		title: 'London zoo',
		icon: pin
	});
	marker.setMap(map);
	marker.addListener('click', function () {
		infowindow.open(map, marker);
	});

	// Allow address autocomplete for user input - Google Places API Web Service
	var input = document.getElementById('start');
	var autocomplete = new google.maps.places.Autocomplete(input);

	// Find directions to the zoo - Google Maps Directions API
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);

	document.getElementById('find-start').addEventListener('click', findStart);
	document.getElementById('get-directions').addEventListener('click', findRoute);
	document.getElementById('mode').addEventListener('change', updateTravelMode);

	function findRoute() {
		console.log('Check if user\'s location not empty');
		if (document.getElementById('start').value == '') {
			window.alert('You need to specify your location!');
			return;
		}
		console.log('Find directions to the zoo');
		marker.setMap(null);
		calcRoute(directionsService, directionsDisplay, zoo);
	}

	function updateTravelMode() {
		console.log('Check if user\'s location not empty');
		if (document.getElementById('start').value == '') {
			return;
		}
		console.log('Update travel mode');
		marker.setMap(null);
		calcRoute(directionsService, directionsDisplay, zoo);
	}
}

function calcRoute(directionsService, directionsDisplay, end) {
	console.log('Calculate route');
	var selectedMode = document.getElementById('mode').value;
	var request = {
		origin: document.getElementById('start').value,
		destination: end,
		travelMode: google.maps.TravelMode[selectedMode]
	};

	directionsService.route(request, function (response, status) {
		if (status == 'OK') {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}

function findStart() {
	console.log('Find user\'s geolocation');
	if (!navigator.geolocation) {
		console.log('geolocation not supported');
		window.alert('Uuh-ooh, your browser doesn\'t support the Geolocation API');
		return;
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
				'location': new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
			},
			function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					document.getElementById('start').value = results[0].formatted_address;
				} else {
					window.alert('Unable to find your location');
				}
			});
	},
	function (positionError) {
		console.log('Error: ' + positionError.message);
	}, {
		enableHighAccuracy: true,
		timeout: 20 * 1000 // 20 seconds
	});
}