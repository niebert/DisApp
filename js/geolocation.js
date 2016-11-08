function getCurrentGeolocation() {
  retrieveLocation(insertPosition);
};
function setFormLocation() {
  retrieveLocation(insertFormPosition);
};

function retrieveLocation(pCallback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pCallback);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

function insertFormPosition(pPosition) {
  var vGeoLocation = document.getElementById("currentGeolocation").value;
  write4name2value("geolocation",vGeoLocation);
};

function createGeoLocation(pPosition) {
  return pPosition.coords.latitude+" "+ pPosition.coords.longitude;
};

function insertPosition(pPosition) {
    //var x = document.getElementById("outputgeo");
    //x.innerHTML = "Latitude: " + position.coords.latitude +
    //"<br>Longitude: " + position.coords.longitude;
    //alert("Latitude: "+pPosition.coords.latitude+" Longitude: " + pPosition.coords.longitude);
    //var vGeoLocation = pPosition.coords.latitude+" "+ pPosition.coords.longitude;
    document.getElementById("currentGeolocation").value = createGeoLocation(pPosition);
};
