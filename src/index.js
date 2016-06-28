import firebase from 'firebase';
import GeoFire from 'geofire';
import Geohash from 'latlon-geohash';
import geocoder from './geocoder.js';
import { FIREBASE_API_KEY, FIREBASE_URL } from './configuration.js';

// geocoder('56 rue des dervallières 44000 Nantes', function(test){
//     console.log(test[0]);
// });

const adresses = [
    { lattitude: 47.22072319999999, longitude: -1.5768232 },
    { lattitude: 46.46505579999999, longitude: -0.8080927999999999 },
    { lattitude: 47.2304537, longitude: -1.6309762 },
    { lattitude: 47.2224769, longitude: -1.5802106 },
].map(function (adresse) {
    return {
        lat: adresse.lattitude,
        long: adresse.longitude,
        geohash: Geohash.encode(adresse.lattitude, adresse.longitude)
    }
});

// Initialize the Firebase SDK
firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    databaseURL: FIREBASE_URL,
});

// Generate a random Firebase location
const firebaseRef = firebase.database().ref();

// Create a new GeoFire instance at the random Firebase location
const geoFire = new GeoFire(firebaseRef);

// Set the initial locations of the fish in GeoFire
console.log("*** Setting initial locations ***");
adresses.map(function (adresse) {
    return geoFire.set(adresse.geohash, [adresse.lat, adresse.long]).then(function () {
        console.log('success');
    });
});

// update
// geoQuery.updateCriteria({
//         center: [lat, lon],
//         radius: radius
//       });

const geoQuery = geoFire.query({
    center: [adresses[0].lat, adresses[0].long],
    radius: 2
});

geoQuery.on("key_entered", function (key, location, distance) {
    console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");
});