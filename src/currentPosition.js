export default function getCurrentPosition(callBack) {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            callBack(getValue(position.coords.latitude, position.coords.longitude));
        });
    } else {
        callBack(getValue(0,0));
    }
}

function getValue(latitude, longitude) {
    return { latitude: latitude, longitude: longitude };
}