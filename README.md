# Meet the penguins!

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://goformarty.github.io/meet-the-penguins/)

Did you know you can pet and feed penguins in the London Zoo?
This interactive web application created with Google Maps API will find for you directions from your geolocation to the Penguin Pool at the London Zoo.

![App screenshot](https://github.com/goformarty/meet-the-penguins/blob/master/screenshot-1.png?raw=true "App screenshot")

## Instructions
### Live demo
You can test a fully working live demo at https://goformarty.github.io/meet-the-penguins/.

It's a **Progressive Web App**, so Android users will be prompt to **add it to the homescreen**! Yay!

### Running locally
To run this app locally **clone or download this repository**.

To **clone** navigate in your terminal to the location you want this repository to be located and run the command git clone:

    $ git clone https://github.com/goformarty/meet-the-penguins.git

And open **index.html** file in your favourite browser.

---

## Technology:
- **Google Maps API**;
- **Google Maps Directions API**;
- **Google Places API Web Service**;
- JavaScript;
- CSS;
- HTML;

---

## User stories:

#### Finding user's location

    As a user
    I want the app to find my geolocation for me
    so that it will know my journey's start point

    As a user
    I want to be able to enter my location
    so that I can choose freely where my journey starts

    As a user
    I want to see location suggestions
    so that I know I entered correct address

#### Finding directions to London Zoo

    As a user
    I want app to find directions to the London Zoo
    so that I can plan my journey

    As a user
    I want to be able to choose my mode of transport
    so that I can see directions tailored for it

#### Navigating the map

    As a user
    I want to zoom in and zoom out the map
    so that I can see more details about my journey

#### Responsive design and accessibility

    As a user
    I want app to be fully responsive
    so that I can use it on phone, tablet and mobile

    As a user
    I want app to be accessible
    so that I can navigate easily with keyboard or screen reader only

    As a user
    I want to be able to specify my location
    so that I can use app when I don't have geolocation

#### PWA
    As a user
    I want to be prompt to add app to my homescreen
    so that I can use it without going to the browser


## What could be improved/added:

- unit and browser tests;
- update service worker to cache files;
- app to respond with a 200 when offline;
- option to choose time and date for the journey;
- "get directions" button disabled until location entered;
- clearer user journey - users may feel confused with 2 options to set their start location;

---

## Resources used:

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial);
- [Google Directions Service](https://developers.google.com/maps/documentation/javascript/places);
- [Google Places API Web Service](https://developers.google.com/maps/documentation/javascript/places);
- [ Google Maps Autocomplete for Addresses](https://developers.google.com/maps/documentation/javascript/places-autocomplete);
- [Google Maps Markers](https://developers.google.com/maps/documentation/javascript/markers);
- [Google Maps Styling Wizard](https://mapstyle.withgoogle.com/);
- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html);
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html "Google JavaScript Style Guide");