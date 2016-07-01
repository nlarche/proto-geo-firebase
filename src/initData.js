import Geohash from 'latlon-geohash';

import geocoder from './geocoder.js';

export default function init(firebaseRef, geoFire) {

    [
        "19 rue des dervaliières, 44000 Nantes",
        "20 rue des dervaliières, 44000 Nantes",
        "21 rue des dervaliières, 44000 Nantes",
        "22 rue des dervaliières, 44000 Nantes",
        "32 Boulevard Jean Moulin 83780 FLAYOSC",
        "21 r Martyrs, 44100 NANTES",
        "Cours des 50-Otages",
        "Galeries Lafayette r Marne, 44000 NANTES",
        "41 Rue du Calvaire de Grillaud 44100 Nantes",
        "2 Avenue Marcelin Berthelot 44800 Saint-Herblain",        
        "4 rue Edith Piaf,  Asturia, 44821 Saint-Herblain",
        "5 rue Edith Piaf, 44821 Saint-Herblain",
        "10 rue Edith Piaf, Asturia, 44821 Saint-Herblain",
        "1 rue Edith Piaf, Asturia, 44821 Saint-Herblain",
        "61 Rue des Morillons, 75015 Paris"
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

