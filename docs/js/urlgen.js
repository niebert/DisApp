function submitRecordHash(pHash) {

}

function setLoaderURL(pURL,pLoader){
	//alert("pURL="+pURL);
  top.vLoaderURL = pURL;
  //document.getElementById('iLoader').contentWindow.document.location.href = "http://www.google.com";
  document.getElementById('iLoader').src = "http://www.google.com";
  //document.getElementById('iLoader').src="loader/callback.html?callbackurl="+encodeURLparam(pURL);
};

function createURL4Hash(pHash) {
  var vURL = getSubmitURLbasic("subscribeapp");
  var vCallBack = document.location.href;
  vURL+="&callbackurl="+encodeURLparam(vCallBack);
  vURL+=record2URLparam(pDBHash);
  return vURL;
}

function record2URLparam(pDBHash) {
  var vParam = "";
  for (var iID in pDBHash) {
    vParam += "&"+iID+"="+encodeURLparam(pDBHash[iID]);
  };
  return vParam;
}

function getSubmitURLbasic(pAction) {
  var vAction = pAction || "subscribeappform";
  var vQueryHash = readQueryParams();
  var vURL = getValueDOM("app_submiturl");
  var vDB  = getValueDOM("app_database");
  //alert("getSubmitURLbasic():openwin.js\nvURL:"+vURL+"\nvDB:"+vDB+"\nactio="+vAction);
  vURL+="?database="+vDB;
  vURL+=appendURIvalue("action",vAction);
  return vURL;
};
