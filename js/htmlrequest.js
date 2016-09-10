function onLoadApp() {
  readWriteQueryParams();
  setOnlineMode(vOnlineMode);
};

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function readQueryParams() {
   //alert(document.location.search);
   return getQueryParams(document.location.search);
 }

function readWriteQueryParams() {
    //reads the Query Parameters of URL and write the Variables to the form elements of HTML page
    var vQuery = getQueryParams(document.location.search);
    var vNode = null;
    for (var vKey in vQuery) {
      vNode = document.getElementById(vKey);
      if (vNode) {
        vNode.value = vQuery[vKey];
        //alert("Key:"+vKey+"=\""+vQuery[vKey]+"\"\nhtmlrequest.js:24 - readWriteQueryParams()");
      } else {
        alert("Key:"+vKey+" not found!\nhtmlrequest.js:24 - readWriteQueryParams()");
      };
    };
    updateDOM(vQuery);
}

function updateDOM(pQuery) {
  //$("#app_database").value = pQuery["app_database"]; //$("#database").value;
  //document.getElementById("app_submiturl").value = pQuery["app_submiturl"];
  //var vNode = document.getElementById("send2appdb");
  //if (vNode) {
  	//vNode.setAttribute("action",pQuery["app_database"]);
  //};
  $('#send2appdb').attr('action', pQuery["app_database"]);
  //$("#send2appdb").action  = $("#app_database").value;
};

function encodeURLparam(pParam) {
  return pParam.replace(/&/g," ");
}

function X_encodeURLparam(pParam) {
	return encodeURIComponent(pParam).replace(/'/g,"%27").replace(/"/g,"%22");
};

function decodeURLparam(pParam) {
	return decodeURIComponent(pParam.replace(/\+/g,  " "));
};
