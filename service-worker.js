(function () {
	'use strict';

	self.addEventListener('install', function (event) {
		console.log('Service worker installing...');
		self.skipWaiting();
	});

	self.addEventListener('activate', function (event) {
		console.log('Service worker activating...');
	});

	self.addEventListener('fetch', function (event) {
		// console.log('Fetching:', event.request.url);
	});

})();