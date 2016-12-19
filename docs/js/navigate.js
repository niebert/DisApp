function quitApp() {
  var txt;
  var r = confirm("Do you want to quit!");
  if (r == true) {
      txt = "You pressed OK!";
      saveAllOfflineJSONDB(vArrayDB);
      window.close();
  } else {
      txt = "You pressed Cancel!";
  };
  console.log(txt);
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
    //calcFuzzyForm(pDBType);
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
