(function () {
	'use strict';
	if (!('serviceWorker' in navigator)) {
		console.log('Service worker not supported');
		return;
	}
	navigator.serviceWorker.register('service-worker.js')
		.then(function (registration) {
			console.log('Registered:', registration);
		})
		.catch(function (error) {
			console.log('Registration failed: ', error);
		});
})();


function createMap() {
	var map, zoo, directionsService, directionsDisplay;
	var markers = [];
	var markerIcons = [];
	var input = document.getElementById('start');

	console.log('Create map centred in London Zoo');

	createStartEndIcons('img/user-pin.png', 'img/penguin-pin.svg');
	setZooPosition(51.535311, -0.153296);
	createMap(zoo);
	addLocationAutocomplete(input);
	initDirectionsService(map);
	allowUserInteraction();

	function allowUserInteraction() {
		document.getElementById('find-start').addEventListener('click', findUserLocation);
		document.getElementById('get-directions').addEventListener('click', findRoute);
		document.getElementById('mode').addEventListener('change', updateTravelMode);
	}

	function createStartEndIcons(iconStart, iconEnd) {
		var pinStart = {
			url: iconStart,
			scaledSize: new google.maps.Size(36, 75)
		};
		var pinEnd = {
			url: iconEnd,
			scaledSize: new google.maps.Size(36, 75)
		};
		markerIcons.start = pinStart;
		markerIcons.end = pinEnd;
	}

	function setZooPosition(lat, lng) {
		zoo = new google.maps.LatLng(lat, lng);
	}

	function createMap(mapCenter) {
		drawMap(mapCenter);
		addMarker(mapCenter, map);
	}

	function drawMap(mapCenter) {
		var mapOptions = {
			zoom: 12,
			center: mapCenter,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: stylesArray
		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
	}

	function addMarker(mapCenter, map) {
		var infowindow = new google.maps.InfoWindow({
			content: '<p style="font-size: 16px; margin-bottom: 0; padding: 10px 0 5px">Sqawk!</p>'
		});
		var marker = new google.maps.Marker({
			position: mapCenter,
			map: map,
			title: 'London zoo',
			icon: markerIcons.end
		});
		markers.push(marker);
		marker.setMap(map);
		marker.addListener('click', function () {
			infowindow.open(map, marker);
		});
	}

	function addLocationAutocomplete(element) {
		// Allow address autocomplete for user input - Google Places API Web Service
		var autocomplete = new google.maps.places.Autocomplete(element);
	}

	function initDirectionsService(map) {
		// Find directions to the zoo - Google Maps Directions API
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer({
			suppressMarkers: true
		});
		directionsDisplay.setMap(map);
	}

	function findUserLocation() {
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

	function findRoute() {
		console.log('Check if user\'s location not empty');
		if (input.value == '') {
			window.alert('You need to specify your location!');
			return;
		}
		console.log('Find directions to the zoo');
		removeExistingMarkers();

		document.getElementById('get-directions').scrollIntoView();
		displayDirections();
	}

	function updateTravelMode() {
		console.log('Check if user\'s location not empty');
		if (input.value == '') {
			return;
		}
		console.log('Update travel mode');
		removeExistingMarkers();
		displayDirections();
	}

	function displayDirections() {
		var start = input.value;
		calcRoute(start, zoo);
	}

	function calcRoute(start, end) {
		console.log('Calculate route');
		var selectedMode = document.getElementById('mode').value;
		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode[selectedMode]
		};

		directionsService.route(request, function (response, status) {
			if (status == 'OK') {
				directionsDisplay.setDirections(response);
				removeExistingMarkers();
				replaceDefaultMarkers(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	function removeExistingMarkers() {
		if (markers.length > 0) {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
		}
	}

	function replaceDefaultMarkers(response) {
		var _route = response.routes[0].legs[0];
		var pinA = new google.maps.Marker({
			position: _route.start_location,
			map: map,
			icon: markerIcons.start
		});
		var pinB = new google.maps.Marker({
			position: _route.end_location,
			map: map,
			icon: markerIcons.end
		});
		markers.push(pinA, pinB);
	}
}