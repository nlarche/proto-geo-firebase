import React from 'react';

import firebase from 'firebase';
import GeoFire from 'geofire';
import GoogleMap from 'google-map-react';

import init from '../initData.js';
import currentPosition from '../currentPosition.js';
import geocoder from '../geocoder.js';

import { FIREBASE_API_KEY, FIREBASE_URL, GOOGLE_API_KEY } from '../configuration.js';

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
        const lat = location[0];
        const long = location[1];

        firebaseRef.child("locations").child(key).once("value", (dataSnapshot) => {

            const location = dataSnapshot.val();

            data.push({
                latitude: lat,
                longitude : long,
                location : location
            });

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
                <GoogleMap
                    bootstrapURLKeys={{
                        key: GOOGLE_API_KEY,
                        language: 'fr',
                    }}
                    defaultCenter={ this.props.center }
                    defaultZoom={ this.props.zoom}
                    >
                    { this.state.data.map((d) => {
                        return <div lat={d.latitude} lng={d.longitude}>{d.location.info.address}</div>;
                    }) }
                </GoogleMap>

            </div >
        );
    }
}
App.defaultProps = {
    center: { lat: 48.856614, lng: 2.3522219000000177 },
    zoom: 8,
};

export default App;