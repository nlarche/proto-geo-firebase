import firebase from 'firebase';
import GeoFire from 'geofire';

import init from './initData.js';
import currentPosition from './currentPosition.js';
import geocoder from './geocoder.js';

import { FIREBASE_API_KEY, FIREBASE_URL } from './configuration.js';

// Initialize the Firebase SDK
firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    databaseURL: FIREBASE_URL,
});

// Generate a random Firebase location
const firebaseRef = firebase.database().ref();

// Create a new GeoFire instance at the random Firebase location
const geoFire = new GeoFire(firebaseRef);

init(geoFire);

let geoQuery;
currentPosition(function (position) {

    geoQuery = geoFire.query({
        center: [position.latitude, position.longitude],
        radius: 5
    });

    geoQuery.on("key_entered", resultQuery);
});

const input = document.getElementById("input");
input.addEventListener("change", function (event) {

    const address = event.target.value;

    if (address) {
        geocoder(address, function (coords) {

            geoQuery.updateCriteria({
                center: [coords[0].latitude, coords[0].longitude],
                radius: 5
            });
        });
    }

});


function resultQuery(key, location, distance) {
    console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");
}


