import Geohash from 'latlon-geohash';

import geocoder from './geocoder.js';

export default function init(firebaseRef, geoFire) {

    [
        "19 rue des dervaliières, 44000 Nantes",
        "32 Boulevard Jean Moulin 83780 FLAYOSC",
        "21 r Martyrs, 44100 NANTES",
        "Cours des 50-Otages",
        "Galeries Lafayette r Marne, 44000 NANTES",
    ].forEach(function (address) {
        geocoder(address, function (coords) {
            const res = {
                latitude: coords[0].latitude,
                longitude: coords[0].longitude,
                geohash: Geohash.encode(coords[0].latitude, coords[0].longitude),
                info: {
                    address: address
                }
            };
            add(res);
        });
    });

    function add(address) {
        geoFire.set(address.geohash, [address.latitude, address.longitude]);
        firebaseRef.child('locations').child(address.geohash).set({ info: address.info });
    }
}

