
//----JSON DB: feedbackdisapp.db -----
var vFeedbackDB =  {
  "database": "feedbackdisapp.db",
  "name":"vFeedbackDB",
  "DBtitle": "DisApp Feedback",
  "DBsubtitle": "App Prototype",
  "submiturl": "http://www.mydisappserver.org/appdb/submit.php",
  "DBformat": ["recdate","autonr","geolocation","yesnotmaybe1","yesnotsomewhat2","yesnotmaybe3","comment4","sampledate","moddate","usergroup","email" ],
  "DBtitles": ["Record Date","No.",
            "Geo Location",
            "Is this app <font color='red'>useful</font>?",
            "Is this app  <font color='red'>easy to use</font>?",
            "Would you <font color='red'>recommend</font> this app to other people?",
            "Please give any other <font color='red'>feedback or suggestions</font>:",
            "Sample Date","Modify Date","User Group","e-Mail" ],
  "DBmandatory": [false,false,false,true,true,true,false,false,false,false],
  "DBvisible":   [false,false,false,true,true,true,false,false,false,false],
  "DBcolinput": {
     "recdate": "<input type=\"text\" id=\"feedback_recdate\" name=\"recdate\" size=\"80\" value=\"\" />",
     "autonr": "<input type=\"text\" id=\"feedback_autonr\" name=\"autonr\" size=\"80\" value=\"\" />",
     "geolocation": "<input type=\"text\" id=\"feedback_geolocation\" name=\"geolocation\" size=\"80\" value=\"\" />",
     "yesnotmaybe1": "<select  id=\"feedback_yesnotmaybe1\" name=\"yesnotmaybe1\" size=\"1\"><OPTION value='NA'></OPTION><option value='1.0'>Definitely YES</option><option value='0.0'>Definitely NO</option><option value='0.5'>MAYBE</option></select> ",
     "yesnotsomewhat2": "<select  id=\"feedback_yesnotsomewhat2\" name=\"yesnotsomewhat2\" size=\"1\"><OPTION value='NA'></OPTION><option value='1.0'>Definitely YES</option><option value='0.0'>Definitely NO</option><option value='0.5'>SOMEWHAT</option></select>",
     "yesnotmaybe3": "<select  id=\"feedback_yesnotmaybe3\" name=\"yesnotmaybe3\" size=\"1\"><OPTION value='NA'></OPTION><option value='1.0'>Definitely YES</option><option value='0.0'>Definitely NO</option><option value='0.5'>MAYBE</option></select>",
     "comment4": "<textarea  id=\"feedback_comment1\" name=\"comment1\" rows=\"4\"></texarea> ",
     "sampledate": "<input  id=\"feedback_sampledate\" type=\"text\" name=\"sampledate\" size=\"80\" value=\"\" />",
     "moddate": "<input  id=\"feedback_moddate\" type=\"text\" name=\"moddate\" size=\"80\" value=\"\" />",
     "usergroup": "<input  id=\"feedback_\" type=\"text\" name=\"usergroup\" size=\"80\" value=\"\" />",
     "email": "<input  id=\"feedback_email\" type=\"text\" name=\"email\" size=\"80\" value=\"\" />"
     },
  "DBlines": [],
  "DBsubmitted": [],
  "LastSyncLine": -1
}
