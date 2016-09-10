
//----JSON DB: test.db -----
var vJSONDB =  {
  "database": "test.db",
  "DBtitle": "Test Database",
  "DBsubtitle": "Dump Check",
  "submiturl": "http://wwwmath1.uni-landau.de/cgi-bin/appdb/mailengine.cgi",
  "DBformat": ["nachname","vorname","autonr","email","userlogin","userpassword","geolocation","latitude","longitude","moddate","recdate" ],
  "DBtitles": ["Nachname","Vorname","Nummer","e-Mail","User Login","User Password","Geo Location","Latitude","Longitude","Modify Date","Create Date" ],
  "DBmandatory": [true,true,false,true,true,true,true,true,true,false,false],
  "DBvisible": [true,true,false,true,true,true,true,true,true,false,false],
  "DBcolinput": {
     "nachname": "<input type=\"text\" name=\"nachname\" size=\"80\" value=\"\" />",
     "vorname": "<input type=\"text\" name=\"vorname\" size=\"80\" value=\"\" />",
     "autonr": "<input type=\"text\" name=\"autonr\" size=\"80\" value=\"\" />",
     "email": "<input type=\"text\" name=\"email\" size=\"35\" value=\"\">",
     "userlogin": "<input type=\"text\" name=\"userlogin\" size=\"80\" value=\"\" />",
     "userpassword": "<input type=\"text\" name=\"userpassword\" size=\"80\" value=\"\" />",
     "geolocation": "<input type=\"text\" name=\"geolocation\" id=\"geolocation\"  size=\"22\" value=\"\"><a href=\"javascript:if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(showLOCgeolocation)}\"> GPS </a><script>function showLOCgeolocation(position) {document.getElementById(\"geolocation\").value = position.coords.latitude+\" \"+position.coords.longitude}</script>",
     "latitude": "<input type=\"text\" name=\"latitude\" id=\"latitude\" size=\"11\" value=\"\"><a href=\"javascript:if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(showLOClatitude)}\">GPS</a><script>function showLOClatitude(position) {document.getElementById(\"latitude\").value = position.coords.latitude}</script>",
     "longitude": "<input type=\"text\" name=\"longitude\" id=\"longitude\"  size=\"10\" value=\"\"><a href=\"javascript:if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(showLOClongitude)}\">GPS</a><script>function showLOClongitude(position) {document.getElementById(\"longitude\").value = position.coords.longitude}</script>",
     "moddate": "<input type=\"text\" name=\"moddate\" size=\"80\" value=\"\" />",
     "recdate": "<input type=\"text\" name=\"recdate\" size=\"80\" value=\"\" />"
     },
  "DBlines": [
        ["D Souza","Patsy","2","patsy@gmail.com","dsouza","patsy","47.996519 8.4624516","48.996519","8.4624516","14.6.2016 (22:37)","10.6.2016 (15:24)" ] ,
        ["Niehaus","Engelbert","1","bert@uni.de","niehaus","test","31.9965191 8.4624454","31.9965191","8.4624454","14.6.2016 (22:38)","8.6.2016 (18:51)" ]
   ]
}
