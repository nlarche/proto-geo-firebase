import React from 'react';

import firebase from 'firebase';
import GeoFire from 'geofire';

import init from '../initData.js';
import currentPosition from '../currentPosition.js';
import geocoder from '../geocoder.js';

import { FIREBASE_API_KEY, FIREBASE_URL } from '../configuration.js';

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

let geoQuery = geoFire.query({
    center: [0, 0],
    radius: 5
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResult = this.handleResult.bind(this);        
    }
    handleResult(key, location, distance) {

        const data = this.state.data;

        firebaseRef.child("locations").child(key).once("value", (dataSnapshot) => {

            const location = dataSnapshot.val();

            data.push(location);

            console.log(location);

            this.setState({ data: data });

        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const text = this.refs.input.value;
        this.refs.form.reset();
        this.refs.input.focus();

        this.setState({ data: [] });

        geocoder(text, (coords) => {

            geoQuery.updateCriteria({
                center: [coords[0].latitude, coords[0].longitude],                
            });
        });
    }
    componentDidMount() {

        geoQuery.on("key_entered", this.handleResult);        

        currentPosition((position) => {            

            geoQuery.updateCriteria({
                center: [position.latitude, position.longitude],                
            });            
        });
    }

    render() {
        return (
            <div>
                <form ref="form" onSubmit={ this.handleSubmit }>
                    <input type="text" ref="input" placeholder="address" />
                </form>
                { this.state.data.map((d) => {
                    return <span>{d.info.address}</span>;
                }) }
            </div >
        );
    }
}

export default App;