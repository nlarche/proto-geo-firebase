export default function (cb) {
    navigator.geolocation.getCurrentPosition(function (position) {
        cb({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
}