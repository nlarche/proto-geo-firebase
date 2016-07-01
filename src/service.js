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
const geoFire = new GeoFire(firebaseRef.child("_geofire"));

init(firebaseRef, geoFire);

export default firebaseRef;
export default geoFire;

export default function service(action, callback) {
     switch (action.type) {
        case 'FETCH':
            
            currentPosition(function (position) {

                geoQuery = geoFire.query({
                    center: [position.latitude, position.longitude],
                    radius: 2
                });

                geoQuery.on("key_entered", resultQuery);
            });
          
         case 'UPDATE':            

            geocoder(action.data, function (coords) {

                geoQuery.updateCriteria({
                    center: [coords[0].latitude, coords[0].longitude],
                    radius: 5
                });
            });
     }  
     callback();
}



function resultQuery(key, location, distance) {

    firebaseRef.child("locations").child(key).once("value", function (dataSnapshot) {

        const location = dataSnapshot.val();       

    });
}




