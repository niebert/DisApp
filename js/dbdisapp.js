
//----JSON DB: disapp.db -----
var vJSONDB =  {
  "database": "disapp.db",
  "DBtitle": "DisApp Short Questionnaire",
  "DBsubtitle": "Database Prototype",
  "submiturl": "http://www.mydisappserver.org/appdb/submit.php",
  "DBformat": ["recdate","autonr","geolocation","countapprox1","countapprox2","peopleapproxii","countapprox3","sampledate","moddate","usergroup","email" ],
  "DBtitles": ["Record Date","No.","Geo Location","How many mosquitos have you noticed (seen or heard)  <font color='red'>during the last two days</font>","Approximately how many mosquito bites have you received <font color='red'>in the last two days</font>","Including you, how many members of your family <font color='red'>who stay with you</font> have gotten dengue in the <font color='red'>last one year</font>?","Have you heard of any cases of Dengue in your neighborhood in <font color='red'>the last one month</font>, including cases in local hospitals?","Sample Date","Modify Date","User Group","e-Mail" ],
  "DBmandatory": [false,false,true,true,true,true,true,false,false],
  "DBvisible": [false,false,true,true,true,true,true,false,false],
  "DBcolinput": {
     "recdate": "<input type=\"text\" name=\"recdate\" size=\"80\" value=\"\" />",
     "autonr": "<input type=\"text\" name=\"autonr\" size=\"80\" value=\"\" />",
     "geolocation": "<table border=\"0\"><tr><td>   <button onclick=\"getCurrentGeolocation();return false\"> GPS </button></td><td><input type=\"text\" name=\"geolocation\" id=\"geolocation\"  size=\"22\" value=\"\"> <script>function showLOCgeolocation(position) {document.getElementById(\"geolocation\").value = position.coords.latitude+\" \"+position.coords.longitude}</script></td></tr></table>",
     "countapprox1": "<SELECT name=\"countapprox1\" size=\"1\"><OPTION></OPTION><OPTION>None </OPTION><OPTION>Very few (1-2)</OPTION><OPTION>Some (3-10)</OPTION><OPTION>High  (more than 10)</OPTION><OPTION>Don`t know</OPTION><OPTION></OPTION></SELECT>",
     "countapprox2": "<SELECT name=\"countapprox2\" size=\"1\"><OPTION></OPTION><OPTION>None </OPTION><OPTION>Very few (1-2)</OPTION><OPTION>Some (3-10)</OPTION><OPTION>High  (more than 10)</OPTION><OPTION>Don`t know</OPTION><OPTION></OPTION></SELECT>",
     "peopleapproxii": "<SELECT name=\"peopleapproxii\" size=\"1\"><OPTION></OPTION><OPTION>No one </OPTION><OPTION>1</OPTION><OPTION>2</OPTION><OPTION>more than 2</OPTION></SELECT>",
     "countapprox3": "<SELECT name=\"countapprox3\" size=\"1\"><OPTION></OPTION><OPTION>None </OPTION><OPTION>Very few (1-2)</OPTION><OPTION>Some (3-10)</OPTION><OPTION>High  (more than 10)</OPTION><OPTION>Don`t know</OPTION><OPTION></OPTION></SELECT>",
     "sampledate": "<input type=\"text\" name=\"sampledate\" size=\"80\" value=\"\" />",
     "moddate": "<input type=\"text\" name=\"moddate\" size=\"80\" value=\"\" />",
     "usergroup": "<input type=\"text\" name=\"usergroup\" size=\"80\" value=\"\" />",
     "email": "<input type=\"text\" name=\"email\" size=\"80\" value=\"\" />"
     },
  "DBlines": [
   ]
}
