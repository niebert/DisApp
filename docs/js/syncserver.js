//---------------------------------------------
//---(1) OnlineMode
//---(2) JSON Sync Server
//---------------------------------------------
function readOnlineStatus() {
  var vOnline = top.vOnlineMode;
  var vAppOnline = getInnerHTML("taOnlineMode");
  if (vOnline) {
    if (vAppOnline.match(/NO/)) {
      console.log("Inconsistent HTML Values for OnlineMode - HTML now set to: FALSE");
      top.setOnlineModeHTML(false);
    };
    console.log("readOnlineStatus()=TRUE");
  } else {
    if (vAppOnline.match(/YES/)) {
      console.log("Inconsistent HTML Values for OnlineMode - HTML now set to: FALSE");
      top.setOnlineModeHTML(false);
    };
    console.log("readOnlineStatus()=FALSE");
  };
  return vOnline;
};

function readOnlineStatusHTML() {
  var vAppOnline = getInnerHTML("taOnlineMode");
  if (vAppOnline.match(/NO/i)) {
    console.log("readOnlineStatusHTML()=FALSE");
    if (top.vOnlineMode) {
      top.vOnlineMode = false;
      console.log("Inconsistent vOnlineMode - Boolean now: FALSE");
    };
    return false;
  } else {
    console.log("readOnlineStatusHTML()=TRUE");
    if (!top.vOnlineMode) {
      top.vOnlineMode = true;
      console.log("Inconsistent vOnlineMode - Boolean now: TRUE");
    };
    return true;
  }
};

function checkOnlineMode() {
  // DEPRICATED
    var vCallJS = "https://niebert.github.io/DisApp/loader/onlinecheck.js";
    console.log("checkOnlineMode()-Call with URL: "+vCallJS);
    top.vLoaderURL = vCallJS;
    //vURL +="loader/setonline.html?calljson="+encodeURLparam(vCallJS);
    var vURL = "loader/setonline.html";
    setLoaderURL(vURL);
};

function selectOnlineMode(pSelect) {
  // this function is called from the SELECT BOX "sOnlineMode"
  //var vNode = document.getElementById("OffOnlineTag");
  if (pSelect == "yes") {
    setOnlineMode(true);
  } else if (pSelect == "no"){
    setOnlineMode(false);
  } else {
    console.log("No Option Selected from [sOnlineMode]");
  };
};

function setOnlineMode(pMode) {
  top.vOnlineMode = pMode;
  top.setOnlineModeHTML(pMode);
};

function setOnlineModeHTML(pMode) {
  //var vNode = document.getElementById("OffOnlineTag");
  if (pMode) {
    top.write2innerHTML("tdOnlineMode","YES");
    top.write2innerHTML("OffOnlineTag","Online");
    $( ".MenuMaplocation" ).show();
    //top.show("MenuMaplocation");
  } else {
    top.write2innerHTML("tdOnlineMode","NO");
    top.write2innerHTML("OffOnlineTag","Offline");
    $( ".MenuMaplocation" ).hide();
    //top.hide("MenuMaplocation");
  };
};

function setSelectOnline(pMode) {
  console.log("setSelectOnline()-Call");
  var vSelNode = document.getElementById("sOnlineMode");
  if (pMode) {
    console.log("set OnlineMode: ONLINE");
    //write2value("sOnlineMode","yes");
    //top.write2innerHTML("tdOnlineMode","YES");
    //top.write2value("sOnlineMode","yes")
    //write2innerHTML("sOnlineMode",vOptNO+vOptYESsel);
    vQueryHash["OnlineMode"] = "1";
    vSelNode.options.selectedIndex = 2;
  } else {
    console.log("set OnlineMode: OFFLINE");
    //write2innerHTML("sOnlineMode",vOptNOsel+vOptYES);
    //top.write2value("sOnlineMode","no")
    //top.write2innerHTML("tdOnlineMode","NO");
    vQueryHash["OnlineMode"] = "0";
    vSelNode.options.selectedIndex = 1;
  };
  setOnlineModeHTML(pMode);
};
//---------------------------------------------
//---2 JSON Handler Sync Server
//---------------------------------------------

function submitData2LocalStorage(pSubmitted,pJSONDB,pDBHash) {
  //alert("Offline Mode - Store Record in Local Storage!\nSync Database when you are ONLINE again (Internet Access)");
  var vDB = pJSONDB || vJSONDB;
  var vDBlines     = vDB["DBlines"];
	var vDBsubmitted = vDB["DBsubmitted"]; //Boolean Array showing that data was submitted by App
	var vDBhash = pDBHash || readRecord2Hash();
  vDBhash["recdate"] = getDate4DB();
  var vDBarray = convertHash2Array(vDBhash);
  if (pSubmitted) {
    // Record was submitted
    vDBsubmitted.push(true);
    //Submission could end up in Server failure, so checking if syncing was successful
    // can be performed only on next restart of the app, when DB was reload remotely
  } else {
    // Record was stored in local storage
    vDBsubmitted.push(false);
  };
  vDBlines.push(vDBarray);
  saveOfflineDB(vDB["database"],vDB);
  vDB["DBlines"].push(vDBarray);
};

function submitForm2JSON(pDB,pType) {
  var vDB = vQueryHash["app_database"] || pDB;
  var vType = pType || "app";
  var vParam = "";
  console.log("submitForm2JSON('"+vDB+"','"+vType+"')");
  write2value(vType+"_recdate",getDate4DB());
  write2value(vType+"_moddate",getDate4DB());
  write2value(vType+"_email",vQueryHash["app_email"]);
  write2value(vType+"_sampledate",Date.now());
  switch (vType) {
    case "app":
      vParam = readRecord2URLparam();
      console.log("Read Questionnaire Form to URL parameter in submitForm2JSON()");
    break;
    case "response":
      vDB = vType + vDB;
      console.log("submitForm2JSON() for Response");
      vParam = readResponse2URLparam();
    break;
    case "feedback":
      vDB = vType + vDB;
      console.log("submitForm2JSON() for Feedback");
      vParam = readFeedback2URLparam();
    break;
    default:
      alert("Type '"+vType+"' for Database '"+vDB+"' undefined in submitForm2JSON()");
  };
  var vURL = getSubmitURLbasic("subscribejson",vDB)+vParam;
  //alert(vURL);
  console.log("submitForm2JSON() with URL: "+vURL);
  if (vOnlineMode) {
    submitJSON(vURL);
    console.log("vOnlineMode=TRUE will try to submit()");
  } else {
    console.log("vOnlineMode=FALSE will store in LocalStorage()");
  }
};

function submitJSON(pURL)
{
  gotoPageJQ("Wait");
  submitJSON_exec(pURL);
}

function submitJSON_exec(pURL)
{
    // submitJSON() loads a javascript lib from Server
    // that return a JS Lib with a hash variable vReturnDB
    // vReturnDB looks like this:
    // -------------------------------------
    // vReturnDB = {};
    // vReturnDB['database']='disapp.db';
    // vReturnDB['error']='';
    // vReturnDB['message']='';
    // vReturnDB['sampledate']='1481621434186';
    // -------------------------------------
    // sampledate is set as milli seconds since 1.1.1970
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = pURL;
    s.innerHTML = null;
    s.id = "js"+Date.now();
    s.name = "name"+Date.now();
    document.getElementById("divJSCALL").innerHTML = "";
    document.getElementById("divJSCALL").appendChild(s);
    //document.location.href =pURL;
    console.log("submitJSON() creates SCRIPT-Tag with name='"+s.name+"'");
    setTimeout('checkSubmitSuccess()',5000);
};

function checkSubmitSuccess() {
  // vReturnDB is a Hash that is defined in the server call of the remote script
  // if vReturnDB is defined then DB submit was successful other not
  console.log("checkSubmitSuccess()-Call");
  var vMSG = "App is OFFLINE\nNo Internet Connectivity or Server Down";
  var vSubmitted = false;
  if (typeof(vReturnDB) !== 'undefined') {
    if (vReturnDB["database"]) {
      console.log("Submit Success App Online - DB: ["+vReturnDB["database"]+"] ");
      top.submitSuccess(true,vReturnDB["message"],vReturnDB["error"]);
      console.log("Data Submitted - Server is Online");
    } else {
      top.submitSuccess(true,vReturnDB["message"],vReturnDB["error"]);
      console.log("Record seems to be submitted to Server\n but vReturnDB['database'] is missing in Server Response");
    };
  } else {
    vMSG += "\nWill save collected Data in LocalStorage";
    alert(vMSG);
    console.log(vMSG);
    submitSuccess(false,vMSG+"Save Collected Record in LocalStorage","");
  };
};


function submitSuccess(pSubmitted,pMessage,pError) {
  top.setSelectOnline(pSubmitted);
  if ((pError) && (pError != "")) {
    var vDB = vReturnDB["database"] || "disapp.db";
    pError = replaceString(pError,"|","\n");
    console.log("Submit Error in submitSuccess()-Call: "+pError);
    alert("ERROR(S) in SUBMISSION:\n"+pError);
    switch (vDB) {
      case "responsedisapp.db":
        //top.submitData2LocalStorage(pSubmitted,vResponseDB);
        gotoPageJQ("response");
        break;
      case "feedbackdisapp.db":
        //top.submitData2LocalStorage(pSubmitted,vFeedbackDB);
        gotoPageJQ("feedback");
        break;
      default:
        gotoPageJQ("app");
        //top.submitData2LocalStorage(pSubmitted);
    };
  } else {
    var vDB = vReturnDB["database"] || "disapp.db";
    console.log("SERVER["+vDB+"]: Call of submitSuccess(pSubmitted,pMessage,pError) seems to be sucessful");
    switch (vDB) {
      case "responsedisapp.db":
        //top.submitData2LocalStorage(pSubmitted,vResponseDB);
        gotoPostSubmit("response",pSubmitted);
        break;
      case "feedbackdisapp.db":
        //top.submitData2LocalStorage(pSubmitted,vFeedbackDB);
        gotoPostSubmit("feedback",pSubmitted);
        break;
      default:
        gotoPostSubmit("app",pSubmitted);
        //top.submitData2LocalStorage(pSubmitted);
    };
  }
};
//----------------------------------------
// Read Record from Feedback
//----------------------------------------
function submitFeedbackJSON() {
  var vType = "feedback";
  var vDatabase = vType + vQueryHash["app_database"];
  submitForm2JSON(vDatabase,vType);
};

function readFeedback2URLparam() {
  var vDBformat = vResponseDB["DBformat"];
  var vDBHash = readRecordDOM2Hash(vDBformat);
  //vDBHash['sampledate'] = Date.now(); is set at the end of readRecord2Hash()
  var vParam = record2URLparam(vDBHash);
  console.log("readRecordDOM2URLparam()\nFeedback Parameter: \n"+vParam);
  return vParam;
};
//----------------------------------------
// Read Record from RESPONSE
//----------------------------------------
function submitResponseJSON() {
  console.log("submitResponseJSON()-Call");
  var vType = "response";
  var vDatabase = vType + vQueryHash["app_database"];
  submitForm2JSON(vDatabase,vType);
};

function getResponseDBFormat() {
  var vDBformat = [];
  var vCount = top.vResponseDB["home"].length;
  var vShift = 1;
  // create and array vDBformat = ["home1","home2",...]
  appendArrayID("home",vCount,vShift,vDBformat);
  console.log("getResponseDBFormat(1) - vResponseDB['home'].length="+vCount);
  vArray = vResponseDB["yourself"];
  var vCount = top.vResponseDB["yourself"].length;
  // create and array vDBformat = ["yourself1","yourself2",...]
  appendArrayID("yourself",vCount,vShift,vDBformat);
  console.log("getResponseDBFormat(2) - vResponseDB['yourself'].length="+vCount);
  vDBformat.push("geolocation");
  vDBformat.push("usergroup");
  vDBformat.push("email");
  vDBformat.push("moddate");
  vDBformat.push("recdate");

  return vDBformat;
}

function readResponse2URLparam() {
  var vDBformat = getResponseDBFormat();
  var vDBHash = readRecordDOM2Hash(vDBformat,"response_");
  //vDBHash['sampledate'] = Date.now(); is set at the end of readRecord2Hash()
  var vParam = record2URLparam(vDBHash);
  console.log("readRecordDOM2URLparam()\nResponse Parameter: \n"+vParam);
  return vParam;
};

function appendArrayID(pIDprefix,pCount,pShift,pArray) {
  console.log("appendArrayID() BEFORE length="+pArray.length);
  var vShift = pShift || 0;
  var vID = 0;
  for (var i = 0; i < pCount; i++) {
    vID = i + vShift;
    pArray.push(pIDprefix+vID);
  };
  console.log("appendArrayID() AFTER length="+pArray.length);
};

function readRecordDOM2Hash (pDBformat,pIDprefix) {
  var vDBHash = {};
  var vID = "";
  var vDOMID = "";
  var vValue = "";
  var vNode = null;
  console.log("readRecordDOM2Hash('"+pDBformat[0]+"','"+pIDprefix+"')");
  for (var i = 0; i < pDBformat.length; i++) {
    vID = pDBformat[i];
    vDOMID = pIDprefix+pDBformat[i];
    vValue = "";
    vNode = document.getElementById(vDOMID);
    if (vNode) {
      vValue = vNode.value;
      console.log("Node ["+vDOMID+"]='"+vValue+"' ");
    } else {
      console.log("ERROR: Node ["+vDOMID+"] not found!\nreadRecordDOM2Hash()-Call ");
    };
    vDBHash[vID] = vValue;
  };
  vDBHash['sampledate'] = Date.now();
  return vDBHash;
};

//----------------------------------------
// Read Record from Questionnaire
//----------------------------------------

function readRecord2URLparam() {
  var vDBHash = readRecord2Hash();
  //vDBHash['sampledate'] = Date.now(); is set at the end of readRecord2Hash()
  var vParam = record2URLparam(vDBHash);
  return vParam;
};

function readRecord2Hash () {
//function readRecord2Hash (pDBformat) {
  //var vDBformat = vJSONDB_Offline["DBformat"] || vJSONDB["DBformat"];
  var vDBformat = vJSONDB["DBformat"];
  var vForm = document.send2appdb;
  //var vDBtitles   = vJSONDB["DBtitles"];
  //var vDBcolinput = vJSONDB["DBcolinput"];
  //var vDBvisible  = vJSONDB["DBvisible"];
  var vDBHash = {};
  var vID = "";
  var vValue = "";
  for (var i = 0; i < vDBformat.length; i++) {
    vID = vDBformat[i];
    vValue = "";
    if (vForm.elements[vID]) {
      vValue = vForm.elements[vID].value;
    };
    vDBHash[vID] = vValue;
  };
  vDBHash['sampledate'] = Date.now();
  return vDBHash;
}

function X_checkOnlineMode() { //Cross Origine Policy violate with this call
    var vURL = "https://niebert.github.io/DisApp/loader/callback.html";
    // var vCallBack = removeParameters(document.location.href);
    var vCallBack = extractPath(document.location.href);
    vCallBack += "/loader/setonline.html";
    alert("CallBack URL: "+vCallBack);
    vURL +="?callbackurl="+encodeURLparam(vCallBack);
    setLoaderURL(vURL);
};


function syncData2Server() {
  pJSONDB_Offline["LastSyncLine"] = -1;
  var vPerformSync = vOnlineMode;
  if (!vOnlineMode) {
    vPerformSync = confirm("When App was started, you did not have Internet Connectivity!\nIf you have Internet now press OK for Syncing\nOtherwise press CANCEL");
  };
  if (vPerformSync == true) {
    alert("Sync Data to Server");
    syncNextRecord();
  } else {
    console.log("Cancel Synchronisation in syncData2Server()-Call");
  }
};

function syncNextRecord() {
  if (syncDataExists()) {
    //fillNextSubmitRecordDB();
    submitSyncRecord();
    setTimeout("syncNextRecord()",800);
  }
}

function countDBvisible() {
  // var vDBvisible = vJSONDB["DBvisible"];
  // var vDBformat  = vJSONDB["DBformat"];
  // var vCount = 0;
  // for (var i = 0; i < vDBvisible.length; i++) {
  //   if (vDBvisible[i]) {
  //     vCount++
  //   };
  // };
  // return vCount;
  return getQuestionCount(); //defined in jsondb.js
};

function syncDataExists () {
  // check  if Data exists ind JSONDB_Offline  that is not synced.
  var vDataExists = false;
  var vDBlines     = vJSONDB_Offline["DBlines"];
	var vDBsubmitted = vJSONDB_Offline["DBsubmitted"]; //Boolean Array showing that data was submitted by App
	var i = vJSONDB_Offline["LastSyncLine"];
  i++;
  while ((vDBsubmitted[i] == true) && (i<vDBlines.length)) {
    i++
  };
  vJSONDB_Offline["LastSyncLine"] = i;
  if (i < vDBlines.length) {
    vDataExists = true;
  };
  return vDataExists;
};

function setBasicIDs4Hash(pDBhash) {
  var vID = "email";
  if (pDBhash[vID ] == "") {
    pDBhash[vID] = vQueryHash["app_"+vID];
  };
  vID = "usergroup";
  if (pDBhash[vID] == "") {
    pDBhash[vID] = vQueryHash["app_"+vID];
  };
  vID = "geolocation";
  if (pDBhash[vID] == "") {
    pDBhash[vID] = getValueDOM("app_geolocation");
  };
  vID = "moddate";
  if (pDBhash[vID] == "") {
    pDBhash[vID] = getDate4DB();
  };
  vID = "recdate";
  if (pDBhash[vID] == "") {
    pDBhash[vID] = getDate4DB();
  };
};

function readRecord2Array () {
  var vDBHash = readRecord2Hash();
  return convertHash2Array(vDBHash);
};

function convertArray2Hash(pDBarray,pDBformat) {
  var vDBformat = pDBformat || vJSONDB["DBformat"];
  var vDBhash = {};
  var vMax = vDBformat.length;
  if (pDBarray.length != vDBformat.length) {
    console.log("ERROR: Length mismatch in convertArray2Hash()-Call");
    if  (pDBarray.length < vDBformat.length) {
      vMax = pDBarray.length;
    }
  };
  for (var i = 0; i < vMax; i++) {
    vDBhash[vDBformat[i]] = pDBarray[i];
  };
  return vDBhash;
};

function convertHash2Array(pDBhash,pDBformat) {
  var vDBarray = [];
  var vDBformat = pDBformat || vJSONDB["DBformat"];
  var vID = "";
  var vValue = "";
  for (var i = 0; i < vDBformat.length; i++) {
    vID = vDBformat[i];
    vValue = pDBhash[vID] || "";
    vDBarray.push(vValue);
  };
  return vDBarray;
};

function convertHash2DBLine(pHash,pDBformat) {
  var vOut = "";
  var vPipe = "";
  if (pDBformat) {
    for (var i = 0; i < pDBformat.length; i++) {
      vOut += vPipe + encodeURLparam(pHash[pDBformat[i]]);
      vPipe = "|";
    }
  }  else {
    for (var iID in pHash) {
      if (pDBformat.hasOwnProperty(iID)) {
          vOut += vPipe + encodeURLparam(pHash[iID]);
          vPipe = "|";
      } else {
        vOut += vPipe + "";
        vPipe = "|";
      }
    }
  };
  return vOut;
}
