
//----JSON DB: disapp.db -----
var vJSONDB =  {
  "database": "disapp.db",
  "DBtitle": "DisApp Short Questionnaire",
  "DBsubtitle": "Database Prototype",
  "submiturl": "http://wwwmath1.uni-landau.de/cgi-bin/appdb/mailengine.cgi",
  "DBformat": ["recdate","autonr","geolocation","countapprox1","countapprox2","peopleapproxii","countapprox3","sampledate","moddate" ],
  "DBtitles": ["Record Date","No.","Geo Location","How many mosquitos have you noticed (seen or heard)  <b>during the last two days</b>","Approximately how many mosquito bites have you received in the last two days</b>","Including you, how many members of your family <b>who stay with you</b> have gotten dengue in the <b>last one year</b>?","Have you heard of any cases of Dengue in your neighborhood in <b>the last one month</b>, including cases in local hospitals?","Sample Date","Modify Date" ],
  "DBmandatory": [false,false,true,true,true,true,true,true,false],
  "DBvisible": [false,false,true,true,true,true,true,true,false],
  "DBcolinput": {
     "recdate": "<input type=\"text\" name=\"recdate\" size=\"80\" value=\"\" />",
     "autonr": "<input type=\"text\" name=\"autonr\" size=\"80\" value=\"\" />",
     "geolocation": "<table border=\"0\"><tr><td><a href=\"javascript:if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(showLOCgeolocation)}\"> [GPS] </a></td><td><input type=\"text\" name=\"geolocation\" id=\"geolocation\"  size=\"22\" value=\"\"> <script>function showLOCgeolocation(position) {document.getElementById(\"geolocation\").value = position.coords.latitude+\" \"+position.coords.longitude}</script></td></tr></table>",
     "countapprox1": "<SELECT name=\"countapprox1\" size=\"1\"><OPTION></OPTION><OPTION>None </OPTION><OPTION>Very few (1-2)</OPTION><OPTION>Some (3-10)</OPTION><OPTION>High  (more than 10)</OPTION><OPTION>Don`t know</OPTION><OPTION></OPTION></SELECT>",
     "countapprox2": "<SELECT name=\"countapprox2\" size=\"1\"><OPTION></OPTION><OPTION>None </OPTION><OPTION>Very few (1-2)</OPTION><OPTION>Some (3-10)</OPTION><OPTION>High  (more than 10)</OPTION><OPTION>Don`t know</OPTION><OPTION></OPTION></SELECT>",
     "peopleapproxii": "<SELECT name=\"peopleapproxii\" size=\"1\"><OPTION></OPTION><OPTION>No one </OPTION><OPTION>1</OPTION><OPTION>2</OPTION><OPTION>more than 2</OPTION></SELECT>",
     "countapprox3": "<SELECT name=\"countapprox3\" size=\"1\"><OPTION></OPTION><OPTION>None </OPTION><OPTION>Very few (1-2)</OPTION><OPTION>Some (3-10)</OPTION><OPTION>High  (more than 10)</OPTION><OPTION>Don`t know</OPTION><OPTION></OPTION></SELECT>",
     "sampledate": "<input type=\"text\" name=\"sampledate\" size=\"80\" value=\"\" />",
     "moddate": "<input type=\"text\" name=\"moddate\" size=\"80\" value=\"\" />"
     },
  "DBlines": [
   ]
}
