function initDisApp() {
  initVariables4DOM();  
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

function initVariables4DOM() {
  write4name2value("recdate",getDate());
  write4name2value("moddate",getDate());
  write4name2value("sampledate",getDate());
  write4name2value("submiturl",getDate());
  write4name2value("autonr","-");
  write4name2value("usergroup",vQueryHash["app_usergroup"]);
  write2value("app_email",vQueryHash["app_email"]);
  //----- Database --------
  write2value("app_database",vQueryHash["app_database"]);
  write2value("save_database",vQueryHash["app_database"]);
  write2value("settings_database",vQueryHash["app_database"]);
  //write2innerHTML("disclaimer_database",vQueryHash["app_database"]);
  write2value("disclaimer_database",vQueryHash["app_database"]);
  if (vQueryHash["app_submiturl"]) {
     write2innerHTML("disclaimer_submiturl",vQueryHash["app_submiturl"]);
     document.getElementById("send2appdb").action = vQueryHash["app_submiturl"];
     document.getElementById("settings_submiturl").value = vQueryHash["app_submiturl"];
  } else {
     console.log("Submit URL was undefined!");
  };
}
