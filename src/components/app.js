import React, { PropTypes } from 'react';

import firebase from 'firebase';
import GeoFire from 'geofire';
import GoogleMap from 'google-map-react';

import init from '../initData.js';
import currentPosition from '../currentPosition.js';
import geocoder from '../geocoder.js';

import MapMarker from './map-marker.js';

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
        this.handleEnter = this.handleEnter.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }
    handleEnter(key, location, distance) {

        const lat = location[0];
        const long = location[1];
        const _key = key;

        firebaseRef.child("locations").child(key).once("value", (dataSnapshot) => {

            const location = dataSnapshot.val();

            this.setState({
                data: [...this.state.data, {
                    key: _key,
                    latitude: lat,
                    longitude: long,
                    location: location
                }]
            });
        });
    }
    handleExit(key, location, distance) {

        const data = this.state.data;
        const index = data.findIndex((e) => {
            return e.key = key;
        });

        if (index === 0) {
            this.setState({
                data: [
                    ...data.slice(index + 1)
                ]
            });
        } else {
            this.setState({
                data: [
                    ...data.slice(start, index),
                    ...data.slice(index + 1)
                ]
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const text = this.refs.input.value;
        this.refs.form.reset();
        this.refs.input.focus();

        geocoder(text, (coords) => {

            const lat = coords[0].latitude;
            const lng = coords[0].longitude;

            this.updatePosition(lat, lng);
        });
    }
    componentDidMount() {

        geoQuery.on("key_entered", this.handleEnter);
        geoQuery.on("key_exited", this.handleExit);

        currentPosition((position) => {

            this.updatePosition(position.latitude, position.longitude);
        });
    }
    updatePosition(lat, lng) {
        this.setState({ center: { lat: lat, lng: lng } });

        geoQuery.updateCriteria({
            center: [lat, lng],
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
                    onBoundsChange={this._onBoundsChange}
                    center={this.state.center}
                    >
                    { this.state.data.map((d) => {
                        return <MapMarker key={d.key}
                            lat={d.latitude}
                            lng={d.longitude}
                            marker={d}
                            />;
                    }) }
                </GoogleMap>
            </div >
        );
    }
}
App.defaultProps = {
    center: { lat: 48.856614, lng: 2.3522219000000177 },
    zoom: 10,
};

export default App;