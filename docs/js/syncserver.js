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
}


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

function setOnlineMode(pMode) {
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
  var vParam = "";
  for (var iID in vDBHash) {
    vParam += "&"+iID+"="+encodeURLparam(vDBHash[iID]);
  };
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
    openWinHTML(vURL,vWinName);
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
