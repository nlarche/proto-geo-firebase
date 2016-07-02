import React, { PropTypes } from 'react';

import firebase from 'firebase';
import GeoFire from 'geofire';

import init from '../initData.js';
import currentPosition from '../currentPosition.js';
import geocoder from '../geocoder.js';

import Map from './google-map-react.js';
import SearchBox from './search-box.js';

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
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
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
  onPlacesChanged(places) {
    places.forEach((p) => {
      const location = p.geometry.location;
      this.updatePosition(location.lat(), location.lng());
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
        <SearchBox onPlacesChanged={ this.onPlacesChanged }/>
        <div>
          <Map {...this.state} {...this.props} />
        </div>
      </div >
    );
  }
}
App.defaultProps = {
  defaultCenter: { lat: 48.856614, lng: 2.3522219000000177 },
  zoom: 10,
};

export default App;
