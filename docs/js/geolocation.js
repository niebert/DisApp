function getDate() {
  return getDate4DB();
};

function getDate4DB() {
  var date = new Date();
  var year  = date.getFullYear();
  var month = date.getUTCMonth();
  var day   = date.getUTCDate();
  var hours = date.getUTCHours();
  var min = date.getUTCMinutes();
  var sec = date.getUTCSeconds();
  var millsec = date.getUTCMilliseconds();
  return year+"/"+month+"/"+day+" "+hours+":"+min+":"+sec+"."+millsec;
}

function getLoginGeolocation() {
  retrieveLocation(insertPosition);
};

//This is called from Submit Form
function getCurrentGeolocation() {
  retrieveLocation(insertFormPosition);
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
  var vGeoLocation = document.getElementById("geolocation").value;
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
