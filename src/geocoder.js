import geocoder from 'google-geocoder';

const GOOGLE_API_KEY = 'AIzaSyDn3oeIK6Cyw4XpprF4dVfd9U1F36b6KrE';

const geo = geocoder({
    key: GOOGLE_API_KEY,
});

export default function getCoordinates(adresse, callBack) {
    return geo.find(adresse, function (err, res) {
        callBack(res.map(function (geoplace) {
            return {
                lattitude: geoplace.location.lat,
                longitude: geoplace.location.lng,
            };
        }));
    });
}


