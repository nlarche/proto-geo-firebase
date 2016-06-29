import Geohash from 'latlon-geohash';

export default function init(geoFire) {

    const addresses = [
        { lattitude: 47.22072319999999, longitude: -1.5768232 },
        { lattitude: 46.46505579999999, longitude: -0.8080927999999999 },
        { lattitude: 47.2304537, longitude: -1.6309762 },
        { lattitude: 47.2224769, longitude: -1.5802106 },
    ].map(function (address) {
        return {
            lat: address.lattitude,
            long: address.longitude,
            geohash: Geohash.encode(address.lattitude, address.longitude)
        };
    }).forEach(function (address) {
        geoFire.set(address.geohash, [address.lat, address.long]);
    });

    return {
        addresses: addresses
    };
}

