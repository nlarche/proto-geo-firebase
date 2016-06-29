import geocoder from 'google-geocoder';
import { GOOGLE_API_KEY } from './configuration.js';

const geo = geocoder({
    key: GOOGLE_API_KEY,
});

export default function getCoordinates(adresse, callBack) {
    return geo.find(adresse, function (err, res) {
        callBack(res.map(function (geoplace) {
            return {
                latitude: geoplace.location.lat,
                longitude: geoplace.location.lng,
            };
        }));
    });
}


