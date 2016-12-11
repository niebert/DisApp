function checkDisclaimer4Submit() {
  var vDisclaimerYesNo = getValueDOM("sDisclaimer");
  if (vDisclaimerYesNo == "yes") {
    $.mobile.changePage( '#pSubmitData', { transition: 'slideup', changeHash: false })
  } else {
    alert("Please accept Disclaimer and Terms of Use first!");
    $.mobile.changePage( '#pDisclaimer', { transition: 'slideup', changeHash: false })
  }
};
