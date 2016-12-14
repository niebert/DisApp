function checkDisclaimer4Submit() {
  var vDisclaimerYesNo = getValueDOM("sDisclaimer");
  if (vDisclaimerYesNo == "yes") {
    $.mobile.changePage( '#pSubmitData', { transition: 'slideup', changeHash: false })
  } else {
    alert("Please accept Disclaimer and Terms of Use first!");
    $.mobile.changePage( '#pDisclaimer', { transition: 'slideup', changeHash: false })
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
  gotoPageJQ("Feedback")
};

function gotoPageJQ(pID) {
  $.mobile.changePage( '#p'+pID, { transition: 'slideup', changeHash: false })

}
