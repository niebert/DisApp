function quitApp() {
  var txt;
  var r = confirm("Do you want to quit!");
  if (r == true) {
      txt = "You pressed OK!";
      saveAllOfflineJSONDB();
      window.close();
  } else {
      txt = "You pressed Cancel!";
  };
  console.log(txt);
};

function gotoSubmitForm(pType) {
  console.log("gotoSubmitForm('"+pType+"')");
  switch (pType) {
    case "app":
      var vOut = "";
      vOut += "Form for DB ["+pType+"]";
      write2value("ulJSONDB",vOut);
      gotoPageJQ("SubmitData");
    break;
    case "response":
      var vOut = "";
      vOut += "Form for DB ["+pType+"]";
      write2value("ulResponseDB",vOut);
      gotoPageJQ("ResponseOptions");
    break;
    case "feedback":
      var vOut = "";
      vOut += "Form for DB ["+pType+"]";
      write2value("ulFeedbackDB",vOut);
      gotoPageJQ("SubmitFeedback");
    break;
    default:
      console.log("gotoPostSubmit() - wrong pType");
  }
};
function getDB4Type(pType) {
  var vDB = null;
  switch (pType) {
    case "app":
      vDB = vJSONDB;
    break;
    case "response":
      vDB = vResponseDB;
    break;
    case "feedback":
      vDB = vFeedbackDB;
    break;
    default:
      console.log("DB-Error: getDB4Type('"+pType+"') pType='"+pType+"' no match found");
  };
  return vDB;
};

function getNavigationHash(pType) {
  var vNavHash = {};
  var vDB = getDB4Type(pType);
  vNavHash["DB"] = vDB;
  if (vDB["EditIndex"] < 0) {
    vDB["EditIndex"] = 0;
    console.log("WARNING: getNavigationHash() EditIndex='"+vDB["EditIndex"]+"'");
  };
  if (vDB["EditIndex"] >= vDB["DBformat"].length) {
    console.log("WARNING: getNavigationHash() EditIndex='"+vDB["EditIndex"]+"' exceed Format length");
    vDB["EditIndex"] = vDB["DBformat"].length -1;
  };
  vNavHash["VisibleIDs"] = getVisibleIDs(vDB);
  return vNavHash;
}

function gotoPreviousQuestion(pType) {
  console.log("gotoPrevious()-Call Questionnaire ["+pType+"]");
  var vNavHash = getNavigationHash(pType);
  var vEditIndex = vNavHash["DB"]["EditIndex"];
  if (vNavHash["DB"]["EditIndex"]>0) {
    vNavHash["DB"]["EditIndex"] = vNavHash["DB"]["EditIndex"] - 1;
  };
  setNavigatedID(pType,vNavHash);
};

function gotoNextQuestion(pType) {
  console.log("gotoNext()-Call Questionnaire ["+pType+"]");
  var vNavHash = getNavigationHash(pType);
  if (vNavHash["DB"]["EditIndex"] < vNavHash["VisibleIDs"].length - 1) {
    //console.log("EditIndex can be incremented");
    vNavHash["DB"]["EditIndex"] = vNavHash["DB"]["EditIndex"] + 1;
  };
  setNavigatedID(pType,vNavHash);
};

function setNavigatedID(pType,pNavHash) {
  var vEditIndex = pNavHash["DB"]["EditIndex"];
  var vID = "";
  var vCount = 0;
  //alert(pNavHash["VisibleIDs"].join(","));
  for (var i = 0; i < pNavHash["VisibleIDs"].length; i++) {
    vCount = i+1;
    vID = "FORMVAR_"+pType+"_"+vCount;
    if (vEditIndex == i) {
      show(vID);
    } else {
      hide(vID);
    }
  };
  vCount = vEditIndex+1;
  var vMarker = "["+vCount+"/"+pNavHash["VisibleIDs"].length+"]";
  write2innerHTML("footerAPPcount",vMarker);
  setPrevNextButtonVisibility(pNavHash);
};

function setPrevNextButtonVisibility(pNavHash) {
    if (pNavHash["DB"]["EditIndex"] == 0) {
      hideElement("bPreviousAPP")
    } else {
      showElement("bNextAPP");
    };
    if (pNavHash["DB"]["EditIndex"] == (pNavHash["VisibleIDs"].length - 1)) {
      hideElement("bNextAPP")
    } else {
      showElement("bNextAPP");
    };
};

function displayCollectedData() {
    var vType = getValueDOM("sDisplayTypeDB");
    var vUnsubmittedONLY = getValueDOM("sUnsubmittedONLY");
    var vDisUnsubONLY = true;
    if (vUnsubmittedONLY = "NO") {
      vDisUnsubONLY = false;
    };
    console.log("Display DB ["+vType+"] with Unsubmitted ONLY='"+vUnsubmittedONLY+"'");
    injectListDB2DOM(vType,vDisUnsubONLY); //defined in jsondb.js
    gotoPageJQ("DisplayListDB");
};


function processQuestionnaire() {
  processForm("app");
};

function processForm(pType) {
    console.log("CHECK FORM: processForm('"+pType+"')");
    var vDB = vQueryHash["app_database"];
    switch (pType) {
      case "app":
        var vErrMSG = checkForm(pType);
        if (vErrMSG != "") {
          showErrorMessage(vErrMSG,pType);
        } else {
          processRecordSubmit(vDB,pType);
        };
      break;
      case "response":
        vDB = pType + vDB;
        var vErrMSG = checkForm(pType);
        if (vErrMSG != "") {
          showErrorMessage(vErrMSG,pType);
        } else {
          processRecordSubmit(vDB,pType);
        };
      break;
      case "feedback":
        vDB = pType + vDB;
        var vErrMSG = checkForm(pType);
        if (vErrMSG != "") {
          showErrorMessage(vErrMSG,pType);
        } else {
          var vStringHash = readRecordDOM2Hash(vFeedbackDB["DBformat"],pType+"_")
          processRecordSubmit(vDB,pType);
        };
      break;
      default:
        console.log("gotoPostSubmit() - wrong pType");
    }
};

function processRecordSubmit(pDB,pDBType) {
    calcFuzzyForm(pDBType);
    console.log("processRecordSubmit() - will try to submit ONLINE or OFFLINE");
    var vOnline = readOnlineStatusHTML();
    if (vOnline) {
      console.log("App - ONLINE");
      //alert("Submit Online - please wait ...");
      submitForm2JSON(pDB,pDBType);
    } else {
      //alert("Submit Offline");
      console.log("App - OFFLINE");
      var vSubmitted = false;
      gotoPostSubmit(pDBType,vSubmitted);
    };
};


function checkDisclaimer4Submit() {
  var vDisclaimerYesNo = getValueDOM("sDisclaimer");
  if (vDisclaimerYesNo == "yes") {
    //$.mobile.changePage( '#pSubmitData', { transition: 'slideup', changeHash: false })
    gotoPageJQ("SubmitData");
  } else {
    alert("Please accept Disclaimer and Terms of Use first!");
    gotoPageJQ("SubmitData");
    //$.mobile.changePage( '#pDisclaimer', { transition: 'slideup', changeHash: false })
  }
};

function gotoPostSubmit(pType,pSubmitted) {
  var vSubmitText = "false";
  if (pSubmitted) {
    vSubmitText = "true";
  };
  var vOut = "";
  console.log("gotoPostSubmit('"+pType+"',"+vSubmitText+")");
  switch (pType) {
    case "app":
      submitData2LocalStorage(pSubmitted,vJSONDB,readRecord2Hash());
      //processForm(pType);
      var vStringHash = readRecordDOM2Hash(vJSONDB["DBformat"],pType+"_")
      vFuzzyControl.create(vStringHash,pType);
      vOut = vFuzzyControl.exec(pType);
      alert("gotoPostSubmit('"+pType+"',"+vSubmitText+"): vOut='"+vOut+"'");
      write2innerHTML("valDefuzzyRiskA",vOut);
      write2innerHTML("valDefuzzyRiskB",vOut);
      gotoPageJQ("Response");
    break;
    case "response":
      //processForm(pType);
      var vStringHash = readRecordDOM2Hash(vResponseDB["DBformat"],pType+"_")
      vFuzzyControl.create(vStringHash,pType);
      vOut = vFuzzyControl.exec(pType);
      write2innerHTML("valDefuzzyResponse",vOut);
      alert("gotoPostSubmit('"+pType+"',"+vSubmitText+"): vOut='"+vOut+"'");
      gotoPageJQ("RiskMitigation");
    break;
    case "feedback":
      gotoPageJQ("ThankYou");
    break;
    default:
      console.log("gotoPostSubmit() - wrong pType");
  }
};

function gotoSubmitQuestionnaire() {
  initDBrecord();
  gotoPageJQ("SubmitForm")
};

function gotoSubmitResponse() {
  //initDBrecord();
  gotoPageJQ("Feedback");
};


function gotoSubmitFeedback() {
  //initDBrecord();
  gotoPageJQ("ThankYou");
};

function gotoPageJQ(pID) {
  $.mobile.changePage( '#p'+pID, { transition: 'slideup', changeHash: false });
  console.log("NAVIGATE to Page p"+pID+" - gotoPageJQ('"+pID+"')");
}
