function submitForm2JSON() {
  var vURL = getSubmitURLbasic("subscribejson")+readRecord2URLparam();
  alert(vURL);
  submitJSON(vURL);
};

function submitJSON(pURL)
{
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = pURL;
    s.innerHTML = null;
    s.id = "js"+Date.now();
    s.name = "name"+Date.now();
    document.getElementById("divJSCALL").innerHTML = "";
    document.getElementById("divJSCALL").appendChild(s);
    //document.location.href =pURL;
    setTimeout('checkSubmitSuccess()',5000);
};

function checkSubmitSuccess() {
  // vReturnDB is a Hash that is defined in the server call of the remote script
  // if vReturnDB is defined then DB submit was successful other not
  var vMSG = "App is OFFLINE\nNo Internet Connectivity or Server Down";
  if (typeof(vReturnDB) !== 'undefined') {
    if (vReturnDB["app_database"]) {
      console.log("App Online - Type of vReturnDB FOUND: ");
      //alert("App is Online");
      top.setSelectOnline(true);
    } else {
      alert(vMSG);
      console.log(vMSG+"\n App Datase in Localstorag is missing");
    };
  } else {
    alert(vMSG);
    console.log(vMSG);
    top.setSelectOnline(false);
  };
}

function checkOnlineMode() {
    var vCallJS = "https://niebert.github.io/DisApp/loader/onlinecheck.js";
    alert("CallJS URL: "+vCallJS);
    top.vLoaderURL = vCallJS;
    //vURL +="loader/setonline.html?calljson="+encodeURLparam(vCallJS);
    var vURL = "loader/setonline.html";
    setLoaderURL(vURL);
};


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

function updateDOM(pQuery) {
  // pQuery is the Query String of the document location
  //$("#app_database").value = pQuery["app_database"]; //$("#database").value;
  //document.getElementById("app_submiturl").value = pQuery["app_submiturl"];
  //var vNode = document.getElementById("send2appdb");
  //if (vNode) {
  	//vNode.setAttribute("action",pQuery["app_database"]);
  //};
  $('#send2appdb').attr('action', pQuery["app_database"]);
  //$("#send2appdb").action  = $("#app_database").value;
};

function syncDataExists () {
  // check  if Data exists ind JSONDB_Offline  that is not synced.
  var vDataExists = false;
  var vDBlines     = vJSONDB_Offline["DBlines"];
	var vDBsubmitted = vJSONDB_Offline["DBsubmitted"]; //Boolean Array showing that data was submitted by App
	var vDBsynced    = vJSONDB_Offline["DBsynced"]; //Boolean Array showing that data is already in Online DB
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

function setSelectOnline(pMode) {
  console.log("setSelectOnline()-Call");
  var vSelNode = document.getElementById("sOnlineMode");
  if (pMode) {
    console.log("set OnlineMode: ONLINE");
    //write2value("sOnlineMode","yes");
    top.write2innerHTML("tdOnlineMode","YES");
    //write2innerHTML("sOnlineMode",vOptNO+vOptYESsel);
    //vSelNode.options.selectedIndex = 1;
  } else {
    console.log("set OnlineMode: OFFLINE");
    //write2innerHTML("sOnlineMode",vOptNOsel+vOptYES);
    top.write2value("sOnlineMode","no")
    top.write2innerHTML("tdOnlineMode","NO");
    //vSelNode.options.selectedIndex = 0;
  };
  setOnlineModeHTML(pMode);
};

function selectOnlineMode(pSelect) {
  //var vNode = document.getElementById("OffOnlineTag");
  if (pSelect == "yes") {
    top.write2innerHTML("OffOnlineTag","Online");
    top.write2innerHTML("taOnlineMode","Online");
    setOnlineMode(true);
  } else {
    top.write2innerHTML("OffOnlineTag","Offline");
    top.write2innerHTML("taOnlineMode","Offline");
    setOnlineMode(false);
  };
};

function setOnlineMode(pMode) {
  vOnlineMode = pMode;
  setOnlineModeHTML(pMode);
};

function setOnlineModeHTML(pMode) {
  //var vNode = document.getElementById("OffOnlineTag");
  if (pMode) {
    write2innerHTML("OffOnlineTag","Online");
  } else {
    write2innerHTML("OffOnlineTag","Offline");
  };
};

function readRecord2Array () {
  var vDBHash = readRecord2Hash();
  return convertHash2Array(vDBHash);
};
function convertArray2Hash(pDBarray) {
  var vDBformat = vJSONDB["DBformat"];
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

function convertHash2Array(pDBhash) {
  var vDBarray = [];
  var vDBformat = vJSONDB["DBformat"];
  var vID = "";
  var vValue = "";
  for (var i = 0; i < vDBformat.length; i++) {
    vID = vDBformat[i];
    vValue = pDBhash[vID] || "";
    vDBarray.push(vValue);
  };
  return vDBarray;
};

function readRecord2URLparam() {
  var vDBHash = readRecord2Hash();
  var vParam = record2URLparam(vDBHash);
  return vParam;
}

function readRecord2Hash () {
  var vDBformat = vJSONDB_Offline["DBformat"] || vJSONDB["DBformat"];
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
  return vDBHash;
}


function submitData2DB () {
  //var vAction="undefined";
  //document.send2appdb.action = getValueDOM("app_submiturl");
  //get
  vURL = getSubmitURLbasic("subscribeapp")+readRecord2URLparam();
  //vURL = getSubmitURLbasic("subscribeapp")+readRecord2URLparam()+"&windowclose=1";

  //var vNode = document.getElementById("send2appdb");
  //if (vNode) {
  //	vAction = vNode.getAttribute("action")
  //};
  //$('#send2appdb').submit();
  if (vOnlineMode == true) {
    var vDate = getDate4DB();
    alert('Submit Data to Server\nDate='+vDate);
    var vWinName = getWinName();
    //openWinHTML(vURL,vWinName);
    submitData2LocalStorage(vDate);
    //document.send2appdb.submit();
  } else {
    alert('OFFLINE: Store Data in Local Storage!\nDate='+Date());
    submitData2LocalStorage("");
  };
  setSelectTableForm(1,getSelectPageCount());
  changeJQueryPage("#collecteddata");
  //document.location("#postDialogExample");
}

function submitData2LocalStorage (pSubmitDate) {
  //alert("Offline Mode - Store Record in Local Storage!\nSync Database when you are ONLINE again (Internet Access)");
  var vDBlines     = vJSONDB_Offline["DBlines"];
	var vDBsubmitted = vJSONDB_Offline["DBsubmitted"]; //Boolean Array showing that data was submitted by App
	var vDBsynced    = vJSONDB_Offline["DBsynced"]; //Boolean Array showing that data is already in Online DB
  var vDBhash = readRecord2Hash();
  vDBhash["recdate"] = pSubmitDate;
  var vDBarray = convertHash2Array(vDBhash);
  if (pSubmitDate != "") {
    // Record was submitted
    vDBsubmitted.push(true);
    //Submission could end up in Server failure, so checking if syncing was successful
    // can be performed only on next restart of the app, when DB was reload remotely
  } else {
    // Record was stored in local storage
    vDBsubmitted.push(false);
  };
  vDBsynced.push(false);  // Submit Record first, before checking Online DB
  vDBlines.push(vDBarray);
  saveOfflineDB(getValueDOM("app_database"),vJSONDB_Offline);
  vJSONDB["DBlines"].push(vDBarray);
  appendHash2ClickableList(vJSONDB["DBlines"].length,vDBhash);
}

function appendHash2ClickableList(pIndex,pDBhash) {
  var vListID = "ul-dbviewer";
  var vContent = getItem4DisplayDB(pIndex,pDBhash);
  append2innerHTML(vListID,vContent);
}
