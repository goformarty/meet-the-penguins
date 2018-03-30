function initMap() {
	console.log("Init map at London zoo")
	var zoo = new google.maps.LatLng(51.535311, -0.153296)
	var myOptions = {
		zoom: 12,
		center: zoo,
		mapTypeId: google.maps.MapTypeId.ROADMAP, 
		styles: stylesArray
	};
	// Draw the map
	var map = new google.maps.Map(document.getElementById("map"), myOptions);
	var infowindow = new google.maps.InfoWindow({
		content: '<p>Sqawk!</p>'
	});
	var marker = new google.maps.Marker({
		position: zoo,
		map: map,
		title: 'London zoo',
		icon: 'img/PenguinMartyPin.svg'
	});
	marker.setMap(map);
	marker.addListener('click', function () {
		infowindow.open(map, marker);
	});


	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	console.log(zoo);

	var findRoute = function () {
		if (document.getElementById('start').value == '') {
			window.alert('You need to specify the start!');
			return;
		}
		marker.setMap(null);
		calcRoute(directionsService, directionsDisplay, zoo);
	};

	var updateTravelMode = function () {
		if (document.getElementById('start').value == '') {
			return;
		}
		calcRoute(directionsService, directionsDisplay, zoo);
	};

	document.getElementById('find-start').addEventListener('click', findStart);
	document.getElementById('get-directions').addEventListener('click', findRoute);
	document.getElementById('mode').addEventListener('change', updateTravelMode);


}

function calcRoute(directionsService, directionsDisplay, end) {
	console.log("calcRoute hey!");
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
	console.log("start");

	if (!navigator.geolocation) {
		console.log("geolocation not supported");
		window.alert("Uuh-ooh, your browser doesn't support the Geolocation API");
		return;
	}

	navigator.geolocation.getCurrentPosition(function (position) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
					"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
				},
				function (results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						document.getElementById('start').value = results[0].formatted_address;
					} else {
						window.alert("Unable to find your address")
					}
				});
		},
		function (positionError) {
			console.log("Error: " + positionError.message);
		}, {
			enableHighAccuracy: true,
			// timeout: 20 * 1000 // 20 seconds
		});
}