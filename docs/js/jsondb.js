//---------------------------------------------
//---1 checkForm
//---------------------------------------------
function checkForm() {
  document.getElementById("errormsg").innerHTML = "";
  var vForm = document.send2appdb.elements;
  var vDBformat     = vJSONDB["DBformat"];
  var vDBtitles     = vJSONDB["DBtitles"];
  var vDBvisible    = vJSONDB["DBvisible"];
  var vDBmandatory  = vJSONDB["DBmandatory"];
  var vElement = null;
  var vSubmit = true;
  var vMSG = "";
  var vErr = "";
  var vComma = "";
  var vCount = 0;
  for (var i=0;i<vDBformat.length;i++) {
    if (vDBvisible[i]) {
      vCount++;
      vErr = "<br>Missing Input: ("+vCount+") "+vDBtitles[i];
      var vNodeArr =document.getElementsByName(vDBformat[i]);
      if (vNodeArr) {
        if (vNodeArr[0]) {
          console.log("["+vDBformat[i]+"] exists");
          if (vNodeArr[0].value == "") {
            vSubmit = false;
            vMSG += vErr
          } else {
            console.log("Input ["+vDBformat[i]+"] OK");
          };
        } else {
          vSubmit = false;
          vMSG += vErr
          console.log("Input ["+vDBformat[i]+"] undefined");
        };
      } else {
        //vItem.style.backgroundColor = "green";
        console.log("Check Form Element ["+vDBformat[i]+"] does not exist!");
      };
    };
  };
  if (vSubmit) {
    //document.send2appdb.submit();
    if (vOnlineMode) {
      //alert("Submit Online - please wait ...");
      submitForm2JSON();
    } else {
      alert("Submit Offline");
    };
  } else {
    showErrorMessage("INPUT ERROR:"+vMSG);
    return false;
  };
};
//---------------------------------------------
//---2 printAllQuestions
//---------------------------------------------

function printAllQuestions() {
  // the IDprefix is inserted before all DOM element IDs
  document.write(createAllQuestions("app_"));
};


function createAllQuestions(pIDprefix) {
  var vIDprefix = pIDprefix || "app_";
  var vOut = "";
  var vDBformat   = vJSONDB["DBformat"];
  var vDBtitles   = vJSONDB["DBtitles"];
  var vDBcolinput = vJSONDB["DBcolinput"];
  var vDBvisible  = vJSONDB["DBvisible"];
  var vCount = 0;
  var vType ="hidden";
  if (vDebug > 0) {
    vType="text";
  };
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    if (vDBvisible[i]) {
      vCount++;
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      vOut += "<li id='FORMVAR"+vCount+"'>("+vCount+") "+vDBtitles[i]+"<br> "+vDBcolinput[vID]+" </li>";
      //alert(vDBformat[i]+" visible");
    } else {
      //alert(vDBformat[i]+" not visible");
      if (vDebug > 0) {
        vOut += vID+": ";
      };
      vOut += "<input type='"+vType+"' name='"+vID+"' id='\""+vIDprefix+vID+"' style='\"display:none\"'>";
    };
  };
  return vOut;
};
//---------------------------------------------
//---3 printAllResponses
//---------------------------------------------

function printAllResponses() {
  // the IDprefix is inserted before all DOM element IDs
  document.write(createAllResponses("response_"));
};

function createAllResponses(pIDprefix) {
  var vIDprefix = pIDprefix || "response_";
  var vOut = "";
  vOut += createResponses(pIDprefix,"home");
  vOut += createResponses(pIDprefix,"yourself");
  vOut += createHiddenFormJSON(pIDprefix,["email","usergroup","geolocation","moddate","recdate"]);
  vOut += "<button id='bSubmitResponses' onclick='submitResponseJSON()'>Submit Response</button>";
  return vOut;
};

function createResponses(pIDprefix,pDBID) {
  //  ("response_","home")
  console.log("createResponses('"+pIDprefix+"','"+pDBID+"')");
  var vResonseArr = vResponseDB[pDBID];
  var vTitle      = vResponseDB["id2title"][pDBID];
  var vTPLID      = vResponseDB["id2select"][pDBID];
  var vSelectTPL  = vResponseDB["select"][vTPLID];
  var vCount = 0;
  var vOut = "";
  vOut+="<h2 id='h2TITLE"+pDBID+"'>"+vTitle+"</h2>";
  vOut+="<ul id='listview"+pDBID+"' data-role='listview' data-inset='true'>";
  var vSelect = "";
  for (var i=0;i<vResonseArr.length;i++) {
      vCount++;
      vSelect = replaceString(vSelectTPL,"___COUNT___",pIDprefix+pDBID+vCount);
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      vOut += "<li id='FORMVAR"+pIDprefix+vCount+"'>("+vCount+") "+vResonseArr[i]+"<br> "+vSelect+" </li>";
      //alert(vDBformat[i]+" visible");
  };
  vOut+="</ul>";
  return vOut;
};
//---------------------------------------------
//---4 printAllFeedback
//---------------------------------------------

function printAllFeedback() {
  // the IDprefix is inserted before all DOM element IDs
  document.write(createAllFeedback("feedback_"));
};


function createAllFeedback(pIDprefix) {
  var vIDprefix = pIDprefix || "feedback_";
  var vOut = "";
  var vDBformat   = vFeedbackDB["DBformat"];
  var vDBtitles   = vFeedbackDB["DBtitles"];
  var vDBcolinput = vFeedbackDB["DBcolinput"];
  var vDBvisible  = vFeedbackDB["DBvisible"];
  var vCount = 0;
  var vType ="hidden";
  if (vDebug > 0) {
    vType="text";
  };
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    if (vDBvisible[i]) {
      vCount++;
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      vOut += "<li id='FORMVAR"+vCount+"'>("+vCount+") "+vDBtitles[i]+"<br> "+vDBcolinput[vID]+" </li>";
      //alert(vDBformat[i]+" visible");
    } else {
      //alert(vDBformat[i]+" not visible");
      if (vDebug > 0) {
        vOut += vID+": ";
      };
      vOut += "<input type='"+vType+"' name='"+vID+"' id='\""+vIDprefix+vID+"' style='\"display:none\"'>";
    };
  };
  return vOut;
};

function createSubmitFormJSON() {
  if (typeof(vJSONDB) !== undefined) {
    var vMax4Page = 4;
    createDatabaseHTML4JSON("Form",vMax4Page);
    printFormPages(vMax4Page);
  } else {
    console.log("JSONDB was undefined! No local storage of JSONDB");
  };
};

function createDisplayFormJSON() {
  if (typeof(vJSONDB) !== undefined) {
    var vMax4Page = 4;
    createDatabaseHTML4JSON("Display",vMax4Page);
    printDisplayPages(vMax4Page);
  } else {
    console.log("JSONDB was undefined! No local storage of JSONDB");
  };
};

function getQuestionCount() {
  var vDBvisible  = vJSONDB["DBvisible"];
  //var vDBformat   = vJSONDB["DBformat"];
  //var vDBtitles   = vJSONDB["DBtitles"];
  //var vDBcolinput = vJSONDB["DBcolinput"];
  //var vDBvisible  = vJSONDB["DBvisible"];
  var vQuestionCount = 0;
  for (var i = 0; i < vDBvisible.length; i++) {
    if (vDBvisible[i] == true) {
      vQuestionCount++;
    }
  };
  return vQuestionCount;
}

function getPagesCount(pMax4Page) {
    var vMax4Page = pMax4Page || 4;
    var vQuestions = getQuestionCount();
    return divmod(getQuestionCount(),vMax4Page)+1;
}

function getSelectPageCount(pMaxSelector) {
  var vMaxSelector = pMaxSelector || 5;
  var vPages = getPagesCount();
  // vPages "-1" because first SelectorPage has one Page Selector Button less
  // vMaxSelector "-1" because each Selector has a [<] Button extra to previous
  return divmod(vPages-1,vMaxSelector-1)+1;
};

function createDatabaseHTML4JSON(pPageType,pMax4Page) {
    //alert("JSONDB was defined!");
    var vID = "";
    var vPages = getPagesCount(pMax4Page);
    //var vPages = divmod(getQuestionCount(),pMax4Page)+1;
    console.log("vPages="+vPages+" Questions="+getQuestionCount());
    if (vPages == 1) {
      //alert("Single Page Form")
    } else {
      //alert("Multiple Pages Form "+vPage);
      printPageSelector(vPages,pPageType);
    };
}


function setSelectTableForm (pSelTableNumber,pSelPages) {
  setSelectTable (pSelTableNumber,pSelPages,"Form");
}

function setSelectTableDisplay (pSelTableNumber,pSelPages) {
  setSelectTable (pSelTableNumber,pSelPages,"Display");
}

function setSelectTable (pSelTableNumber,pSelPages,pPageType) {
  console.log("("+pPageType+") Select Pages No="+pSelTableNumber+" Max Selector Pages="+pSelPages);
  for (var i=1;i<=pSelPages;i++) {
    if (i == pSelTableNumber) {
      show("seltable"+pPageType+i);
    } else {
      hide("seltable"+pPageType+i);
    }
  }
};

function printPageSelector (pPages,pPageType) {
  var vPageType = pPageType || "Form";
  var vOut = "";
  var vSelCount = 0;
  var vSelTableCount = 0;
  var vLabel = "";
  var vTableLabel = "";
  var vMaxSelector = 5;
  vOut += "<div id='seltable"+pPageType+"1'>";
  vOut += '<table width="100%" height="40px" border=0 ><tr>';
  // In general 5 Page Buttons per Line, One Button is [>], so in general 4 Page Buttons
  //var vMaxSelPages = divmod(pPages-1,vMaxSelector-1)+1;
  //var vMaxSelPages = getSelectPageCount(5); //without parameter default=5 is used
  var vMaxSelPages = getSelectPageCount(vMaxSelector);
  console.log("Buttons for Pages="+pPages+" Selector Pages="+vMaxSelPages);
  for (var i=1;i<=pPages;i++) {
    vSelCount++;
    vOut += "<td>";
    if (vSelCount == vMaxSelector) {
      vSelTableCount++;
      console.log("Create ["+pPageType+"]-Select Table with vSelTableCount="+vSelTableCount);
      vLabel = "&gt;";
      vTableLabel = vSelTableCount+1;
      vOut += "<input class='ui-btn' type='button' value='"+vLabel+"' onclick='show"+vPageType+"Page("+i+","+pPages+");setSelectTable"+vPageType+"("+vTableLabel+","+vMaxSelPages+")' />";
      vOut += "</td>";
      vSelCount = 0;
      vOut += "</tr></table>";
      vOut += "</div>";
      vLabel = "&lt;";
      vOut += "<div id='seltable"+pPageType+vTableLabel+"' style='display:none'>";
      //vOut += "<div id='seltable"+vTableLabel+"'>";
      vTableLabel = vSelTableCount;
      vOut += '<table width="100%" height="40px" border=0><tr>';
      vOut += "<td>";
      vOut += "<input class='ui-btn' type='button' value='"+vLabel+"' onclick='show"+vPageType+"Page("+(i-1)+","+pPages+");setSelectTable"+vPageType+"("+vTableLabel+","+vMaxSelPages+")' />";
      vOut += "</td>";
      vOut += "<td>";
      vSelCount = 1;
    };
    vLabel = i;
    vOut += "<input class='ui-btn' type='button' value='"+vLabel+"' onclick='show"+vPageType+"Page("+i+","+pPages+")' />";
    //vOut += "<button onclick='showFormPage("+i+","+vPage+")' >"+i+"</button>";
    vOut += "</td>";
  };
  vOut += "</tr></table>";
  vOut += "</div>";
  //document.getElementById("PageButtons").innerHTML = vOut;
  document.write(vOut);
};

function printHeader() {
  document.write("<h2>"+vJSONDB["DBtitle"]+"</h2>");
  document.write("<i>"+vJSONDB["DBsubtitle"]+" ["+vJSONDB["database"]+"]</i>");
};


function printFormPages(pMax4Page) {
  var vMax4Page = pMax4Page || 4;
  var vDBformat   = vJSONDB["DBformat"];
  var vDBtitles   = vJSONDB["DBtitles"];
  var vDBcolinput = vJSONDB["DBcolinput"];
  var vDBvisible  = vJSONDB["DBvisible"];
  var vMax4Page = pMax4Page || 4;
  var vPage = 0;
  var vCount = 0;
  var vType ="hidden";
  if (vDebug > 0) {
    vType="text";
  };
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    if (vDBvisible[i]) {
      vCount++;
      if (vCount == 1) {
        vPage++;
        if (vPage == 1) {
          document.write("<div id=\"forminput"+vPage+"\" >");
        } else {
          document.write("<div id=\"forminput"+vPage+"\" style=\"display:none\">");
        };
      };
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      document.write(vPage+"."+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+" ");
      if (vCount == vMax4Page) {
        document.write("</div>");
        vCount = 0;
      };
      //alert(vDBformat[i]+" visible");
    } else {
      //alert(vDBformat[i]+" not visible");
      if (vDebug > 0) {
        document.write(vID+": ");
      };
      document.write("<input type='"+vType+"' name='"+vID+"' id='\"formdb_"+vID+"' style='\"display:none\"'>");
    };
  };
  document.write("</div>");
};

function printDisplayPages(pMax4Page) {
  var vMax4Page = pMax4Page || 4;
  var vDBformat   = vJSONDB["DBformat"];
  var vDBtitles   = vJSONDB["DBtitles"];
  //var vDBcolinput = vJSONDB["DBcolinput"];
  var vDBvisible  = vJSONDB["DBvisible"];
  var vMax4Page = pMax4Page || 4;
  var vPage = 0;
  var vCount = 0;
  var vID = "";
  for (var i=0;i<vDBformat.length;i++) {
    if (vDBvisible[i]) {
      vCount++;
      if (vCount == 1) {
        vPage++;
        if (vPage == 1) {
          document.write("<div id=\"displayinput"+vPage+"\" >");
        } else {
          document.write("<div id=\"displayinput"+vPage+"\" style=\"display:none\">");
        };
      };
      vID = vDBformat[i];
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      //document.write(vPage+"."+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+" ");
      document.write(vPage+"."+vCount+" "+vDBtitles[i]+": <div style='background:white' id='dbcontent_"+vID+"'>"+vID+"</div><hr/>");
      if (vCount == vMax4Page) {
        document.write("</div>");
        vCount = 0;
      };
      //alert(vDBformat[i]+" visible");
    } else {
      //alert(vDBformat[i]+" not visible");
    };
  };
  document.write("</div>");
};


function getLocalRecords(pDBID) {
  var vReturn = [];
  var vDBID = pDBID || "DBlines";
  if (vJSONDB_Offline) {
    console.log("vJSONDB_Offline exists in getLocalRecords('"+pDBID+"')");
  } else {
    console.log("vJSON_Offline does not exist!");
    top.vJSON_Offline = {};
  };
  if (vJSONDB_Offline[vDBID]) {
    vReturn = vJSONDB_Offline[vDBID];
  } else {
    console.log("vJSON_Offline exists vJSON_Offline['"+vDBID+"'] does not exist.");
    vJSONDB_Offline[vDBID] = [];
  };

  return   vReturn;
};

function initDBrecord() {
  fillDefaultRecordDB();
  retrieveLocation(fillDefaultGeolocationDB);
};

function fillDefaultGeolocationDB(pPosition) {
  var vQueryHash = readQueryParams();
  var vDBformat   = vJSONDB["DBformat"];
  var vID = "";
  var vNode = null;
  if (vDBformat) {
    for (var i=0;i<vDBformat.length;i++) {
      vID = vDBformat[i];
      if (vID == "geolocation") {
        vNode = document.send2appdb.elements[vID];
        if (!vNode) {
          console.log("vNode["+vID+"] is undefined");
        } else if (pPosition) {
          vNode.value = createGeoLocation(pPosition);
        } else {
          console.log("fillDefaultGeolocationDB()-Call pPosition undefined!");
        }
      }
    }
  }
};

function fillDefaultRecordDB() {
  var vQueryHash = readQueryParams();
  var vDBformat   = vJSONDB["DBformat"];
  var vID = "";
  var vNode = null;
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    vNode = document.send2appdb.elements[vID];
    if (vNode) {
        switch (vID) {
          case "username":
            vNode.value = vQueryHash["app_username"];
            break;
          case "email":
            vNode.value = vQueryHash["app_email"];
            break;
          case "recdate":
            vNode.value = getDate4DB();
            break;
          case "moddate":
            vNode.value = Date();
            break;
          case "sampledate":
            vNode.value = getDate4DB();
            break;
          default:
            vNode.value = "";
        }
    } else {
        console.log("WARNING: Init failed for form element ["+vID+"], because DOM element does not exist!");
    };
  };
};

function fillSubmitRecordDB(pIndex) {
  var vDBformat   = vJSONDB["DBformat"];
  var vDBtitles   = vJSONDB["DBtitles"];
  var vDBvisible  = vJSONDB["DBvisible"];
  var vDBlines    = getLocalRecords(); // vJSONDB["DBlines"];
  var vID = "";
  var vMax = vDBformat.length;
  if ((pIndex >=0) && (pIndex < vDBlines.length)) {
    if (vDBlines[pIndex].length < vDBformat.length) {
      vMax = vDBlines[pIndex].length;
      console.log("ERROR: Record length(="+vDBlines[pIndex].length+") shorter with length of DB format(="+vMax+")");
    } else {
      if (vDBlines[pIndex].length < vDBformat.length) {
        console.log("ERROR: Record length(="+vDBlines[pIndex].length+") longer with length of DB format(="+vMax+")");
      }
    };
    for (var i=0;i<vMax;i++) {
      //if (vDBvisible[i]) {
      vID = vDBformat[i];
      if (document.send2appdb.elements[vID]) {
          document.send2appdb.elements[vID] = vDBlines[pIndex][i];
      } else {
          console.log("WARNING: Form element ["+vID+"] does not exist in Submit form");
      };
    }
  } else {
    console.log("pIndex="+pIndex+" is out of range. vDBlines.length="+vDBlines.length);
  }

}

function fillOfflineRecordDB(pIndex,pIDprefix) {
  var vIDprefix = pIDprefix || "app_";
  var vDBformat   = vJSONDB["DBformat"];
  var vDBtitles   = vJSONDB["DBtitles"];
  var vDBvisible  = vJSONDB["DBvisible"];
  var vDBlines    = vJSONDB_Offline["DBlines"];
  var vID = "";
  if ((pIndex >=0) && (pIndex < vDBlines.length)) {
    for (var i=0;i<vDBformat.length;i++) {
      vID = vDBformat[i];
      write2value(vIDprefix + vID , vDBlines[pIndex][i]);
      //$("#dbcontent_"+vID).html(vDBlines[pIndex][i]);
    }
  } else {
    console.log("JSONDB_Offline pIndex="+pIndex+" is out of range. vDBlines.length="+vDBlines.length);
  }

};

function fillContentRecordDB(pIndex) {
  var vDBformat   = vJSONDB["DBformat"];
  var vDBtitles   = vJSONDB["DBtitles"];
  var vDBvisible  = vJSONDB["DBvisible"];
  var vDBlines    = vJSONDB["DBlines"];
  var vID = "";
  if ((pIndex >=0) && (pIndex < vDBlines.length)) {
    for (var i=0;i<vDBformat.length;i++) {
      if (vDBvisible[i]) {
        vID = vDBformat[i];
        $("#dbcontent_"+vID).html(vDBlines[pIndex][i]);
      };
    }
  } else {
    console.log("pIndex="+pIndex+" is out of range. vDBlines.length="+vDBlines.length);
  }

}

function getItem4DisplayDB(pIndex,pDBhash) {
  var vCount = pIndex + 1;
  var vLabel = pDBhash["sampledate"];
  return "<li><a href='#pDisplayRecord' onclick=\"fillContentRecordDB("+pIndex+");alert('Display Record "+vCount+"')\">"+vCount+" "+vLabel+"</a></li>";
};

function createHiddenFormJSON(pDBType,pArrID) {
  var vDBType = pDBType || "app_";
  var vArrID = pArrID || ["email","usergroup","geolocation","recdate","moddate"];
  var vType ="hidden";
  var vOut = "";
  var vDebugLabel = "";
  if (vDebug > 0) {
    vType="text";
  };
  for (var i = 0; i < pArrID.length; i++) {
    vOut += '<input type="'+vType+'" name="'+vArrID[i]+'" id="'+vDBType+vArrID[i]+'" value="" />';
  };
  return vOut;
}
