function initDisApp() {
  loadAllOfflineJSONDB(vArrayDB);
  //handleOfflineJSONDB(vQueryHash);
  setFormLocation();
  var vKey = "sDisclaimer";
  write2value(vKey,loadLocalVar(vKey));
  initVariables4DOM();
};


function initVariables4DOM() {
  write4name2value("recdate",getDate());
  write4name2value("moddate",getDate());
  write4name2value("sampledate",Date.now());
  write4name2value("submiturl",vQueryHash["app_submiturl"]);
  write4name2value("autonr","-");
  write4name2value("usergroup",vQueryHash["app_usergroup"]);
  //----- e-Mail --------
  write2value("disclaimer_email",vQueryHash["app_email"]);
  write2value("settings_email",vQueryHash["app_email"]);
  //----- Database --------
  write2value("app_database",vQueryHash["app_database"]);
  write2value("save_database",vQueryHash["app_database"]);
  write2value("settings_database",vQueryHash["app_database"]);
  write2value("disclaimer_database",vQueryHash["app_database"]);
  //write2innerHTML("disclaimer_database",vQueryHash["app_database"]);
  //----- SubmitURL --------
  if (vQueryHash["app_submiturl"]) {
    write2value("save_submiturl",vQueryHash["app_submiturl"]); // visible in Disclaimer
    write2value("settings_submiturl",vQueryHash["app_submiturl"]); // visible in Settings
    write2innerHTML("disclaimer_submiturl",vQueryHash["app_submiturl"]); //hidden in Disclaimer
    document.getElementById("send2appdb").action = vQueryHash["app_submiturl"];
  } else {
     console.log("Submit URL was undefined!");
  };
}


function updateSetting(pNameID,pValue) {
  switch (pNameID) {
    //--------
    case "recdate":
      write4name2value(pNameID,getDate());
    break;
    //--------
    case "recdate":
      write4name2value(pNameID,getDate());
    break;
    //--------
    case "geolocation":
      write4name2value(pNameID,getDate());
    break;
    //--------
    default:

  }
}

function updateQuery2DOM(pQuery) {
  // pQuery is the Query String of the document location
  //$("#app_database").value = pQuery["app_database"]; //$("#database").value;
  //document.getElementById("app_submiturl").value = pQuery["app_submiturl"];
  //var vNode = document.getElementById("send2appdb");
  //if (vNode) {
  	//vNode.setAttribute("action",pQuery["app_database"]);
  //};
  $('#send2appdb').attr('action', pQuery["app_database"]);
  //$("#send2appdb").action  = $("#app_database").value;
  initVariables4DOM();
};
