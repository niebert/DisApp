function submitRecordHash(pHash) {

}

function setLoaderURL(pURL){
	//alert("pURL="+pURL);
	//document.getElementById('iLoader').contentWindow.document.location.href = pURL;
  document.getElementById('iLoader').src="http://google.com/";
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
