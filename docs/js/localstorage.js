
function saveLocalStorageValueOK(pID,pText) {
	saveLocalStorageValue(pID);
	alert(pText+" saved!");
};

function saveLocalStorageValue(pID) {
	//localStorage.setItem(pID,document.getElementById(pID).value);
	var vValue = getValueDOM(pID);
	localStorage.setItem(pID,vValue);
  console.log("LocalStorage Save: ["+pID+"]='"+vValue+"'");
};

function loadLocalStorageValue(pID) {
	var vDecode = true;
	loadLocalStorageValue_Decode(pID,vDecode);
};


function loadLocalStorageValue_Decode(pID,pDecode) {
  if (localStorage.getItem(pID) === null) {
    console.log("Local Storage Variable ["+pID+"] was not set!");
  } else {
		var vValue = localStorage.getItem(pID);
		if (pDecode) {
			vValue = decodeURLparam(vValue);
		};
    write2value(pID, vValue);
    console.log("LocalStorage Load: ["+pID+"]='"+vValue+"'");
  };
};

function saveLocalStorageInnerHTML(pID) {
  //localStorage.setItem(pID,document.getElementById(pID).innerHTML);
	localStorage.setItem(pID,getInnerHTML(pID));
  console.log("LocalStorage Save: ["+pID+"]");
};

function loadLocalStorageInnerHTML(pID) {
  if (localStorage.getItem(pID) === null) {
    console.log("Local Storage Variable ["+pID+"] was not set!");
  } else {
    write2innerHTML(pID, localStorage.getItem(pID));
    console.log("LocalStorage Load: ["+pID+"]");
  };
};

function handleOfflineJSONDB(pQueryHash,pType) {
	var vType = pType || "app";
	var vDBName = pQueryHash["app_database"];
	vDBName = vType+"_"+vDBName;
	var vDB_Offline = loadOfflineDB(vDBName);
	if (typeof(vDB_Offline)  !== "undefined" )  {
		console.log("Offline DB: vDB_Offline ["+vDBName+"] exists in handleOfflineJSONDB()-Call");
	} else {
			console.log("WARNING: vJSONDB_Offline does NOT exists!\nArrays 'DBlines,DBsubmitted,DBsampledate' are created");
			vJSONDB_Offline = {};
			vJSONDB_Offline["DBlines"] = [];
			vJSONDB_Offline["DBsubmitted"] = [];
			vJSONDB_Offline["DBsampledate"] = [];
	};
}

function handleLocalJSONDB(pQueryHash) {
	//var vDBName = "DissAppJSONDB";
	//var vDBsourceJS = document.getElementById("DissAppJSONDB").innerHTML;
	var vDBName = pQueryHash["app_database"];
	//var vJSONDB_Offline =
	if (typeof(vJSONDB)  != "undefined" )  {
		//alert("JSONDB exists");
		if (vJSONDB) {
			console.log("vJSONDB as JS Object is defined and saved");
			saveLocalDB(vDBName,vJSONDB);
		} else {
			vJSONDB = loadLocalDB(vDBName);
			console.log("vJSONDB as JS Object is NOT defined");
		};
		vJSONDB_Offline["DBformat"] = vJSONDB["DBformat"];
	} else {
		var vMSG = "vJSONDB was undefined - please check '/db/"+vDBName+"'!"
		console.log(vMSG);
		alert(vMSG);
	};
};

function getDBformatIndex (pDBformat,pID) {
	var vIndex = -1;
	if (pDBformat) {
		for (var i = 0; i < pDBformat.length; i++) {
			if (pID == pDBformat[i]) {
				vIndex = i;
			};
		};
	} else {
		console.log("pDBformat is not defined");
	};
	return vIndex;
}

function compareSyncDB(pJSONDB) {
	// DEPRICATED Function
	console.log("Check if Records are Synced");
	console.log("Primary Key of DB = 'sampledate' and 'email'");
	var vDBlines_Offline = vJSONDB_Offline["DBlines"];
	if (vDBlines_Offline) {
		var vDBsynced = vJSONDB_Offline["DBsynced"]; //Boolean Array showing that data is already in Online DB
		var vDBlines = vJSONDB["DBlines"];
		var vRecord_Offline = null;
		var vRecord = null;
		var i_sampledate = getDBformatIndex(vJSONDB["DBformat"],"sampledate");
		if (i_sampledate >= 0) {
			for (var i = 0; i < vDBlines_Offline.length; i++) {
				var vRecordFound = find_Record_in_OnlineDB(vRecord_Offline[i],vDBlines);
				if (vRecordFound >= 0) {
					vDBsynced[i] = true;
				} else {
					vDBsynced[i] = false;
				}
			};
		} else {
			alert("Sync cannot be checked due to missing 'sampledate' value in DB");
		}
	} else {
		console.log("Local Storage Sync Check - empty Offline DB - nothing to do");
	}

}
function find_Record_in_OnlineDB(pRecord_Offline,pDBlines) {
	var vFound = -1;
	for (var k = 0; k < pDBlines.length; k++) {
		vRecord = pDBlines[i];
		if (compareRecordsDB(vRecord_Offline,vRecord)) {
			vFound = i;
		};
	};
	return vFound;
}

function compareRecordsDB(pRecord_Offline,pRecord) {
	// compares if offline records can be found remote DB
	var i = getDBformatIndex(vJSONDB["DBformat"],"sampledate");
	var j = getDBformatIndex(vJSONDB["DBformat"],"email");
	if (j<0) {
		console.log("DB Comparision will not include email");
	};
	if (vRecord[i] == vRecord_Offline[i]) {
			if (j >=0) {
				if (vRecord[j] == vRecord_Offline[j]) {
					return true
				} else {
					return false
				}
			} else {
				return true;
			}
	} else {
		return false
	}
}

function check_Local_Init() {
	// check if localstorage database is initialized with DBformat
	var vJSONDB_Offline = loadLocalDB()
	if (vJSONDB_Offline) {
		if (vJSONDB_Offline["DBlines"]) {
			console.log("OFFLINE_"+vJSONDB["database"]+" is defined");
			compare_Offline_Online_DB();
		} else {
			console.log("OFFLINE_"+vJSONDB["database"]+" initialisation performed");
			getJSONDB_Local_Default();
			//vJSONDB_Offline["DBlines"] = [];
			//vJSONDB_Offline["DBsubmitted"] = [];
			//vJSONDB_Offline["DBsynced"] = [];
			//vJSONDB_Offline["DBformat"] = vJSONDB["DBformat"].slice(); // Duplicate Array
			//vJSONDB_Offline = getJSONDB_Local_Default();
			//vJSONDB_Offline["LastSyncLine"] = -1;
		}
	} else {
		console.log("vJSONDB_Offline does not exist - check_Local_Init()-Call");
	}
}


function convertDBformat(pFormatSource,pFormatDest,pLine) {
	// Convert DB-Line to SourceHash in pFormatSource
	var vSourceHash
	// init the Destination Hash DestHash with "" in pFormatDest;

	// Fill DestHash with Value from SourceHash with pFormatSource
	// export DestHash to DB-Line with Destination Hash
}



function compare_Format_DB(pDB1,pDB2) {
	// compare Format of DBs
	var vRet = true;
	if (pDB1.length != pDB2.length) {
		vRet = false;
	} else {
		for (var i = 0; i < pDB1.length; i++) {
			if (pDB1[i] != pDB2[i]) {
				vRet = false;
			}
		}
	};
	// if differences occur sync data first
	return vRet;
};

function loadOfflineDB(pDBName) {
	var lvJSONDB_Offline = loadLocalDB("OFFLINE_"+pDBName);
	check_Local_Init();
	return lvJSONDB_Offline;
}

function saveOfflineDB(pDBName,pJSONDB_Offline) {
	var vLastSyncLine = pJSONDB_Offline["LastSyncLine"];
	pJSONDB_Offline["LastSyncLine"] = -1; //means recheck syncing of ALL records after app start
	// Rechecking makes sense if submission of records performed, but failed not enter the Online DB due to server problems
	saveLocalDB("OFFLINE_"+pDBName,pJSONDB_Offline);
	pJSONDB_Offline["LastSyncLine"] = vLastSyncLine; //syncing will start at the same last records
};

function parseJSONDB(pDBName,pStringJSON) {
  var vJSONDB = null;
  if (pStringJSON) {
    var vTest = pStringJSON.replace(/\S\t/g,"");
    if (vTest.length > 0) {
      console.log("JSONDB is defined in localStorage");
      vJSONDB = JSON.parse(pStringJSON)
    } else {
      console.log("parseJSONDB()-Call: JSONDB ["+pDBName+"] cannot be parsed - empty String in LocalStorage");
    }
  } else {
    console.log("parseJSONDB()-Call: JSONDB ["+pDBName+"] is undefined in LocalStorage.");
  }
};


function loadLocalDB(pDBName) {
  var vJSONDB = null;
  if (typeof(Storage) != "undefined") {
    // Store
    if (typeof(localStorage.getItem(pDBName)) != undefined) {
      console.log("JSON-DB '"+pDBName+"' try loading from Local Storage");
      var vJSONstring = localStorage.getItem(pDBName);
      vJSONDB = parseJSONDB(pDBName,vJSONstring);
    } else {
      console.log("JSON-DB '"+pDBName+"' is undefined in Local Storage");
    };
  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  };
  return vJSONDB;
};


function copy_array(pArray) {
	return pArray.slice();
};

function init_JSONDB(pJSONDB) {
	if (pJSONDB) {
		pJSONDB["DBlines"] = [];
		pJSONDB["DBsubmitted"] = []; //Boolean Array showing that data was submitted by App
		pJSONDB["LastSyncLine"] = -1;
		if (vJSONDB["DBformat"]) {
		} else {
			pJSONDB["DBformat"] = ["sampledate","email","usergroup","geolocation","moddate","recdate"];
		};
	} else {
		alert("ERROR: No Database is loaded! - init_JSONDB(pJSONDB)-Call");
		//vJSONDB_Init["DBformat"] = ["email","username","geolocation","sampledate"];
	};
}


function getJSONDB_Local_Default() {
	vJSONDB_Offline["DBlines"] = [];
	vJSONDB_Offline["DBsubmitted"] = []; //Boolean Array showing that data was submitted by App
	vJSONDB_Offline["DBsynced"] = []; //Boolean Array showing that data is already in Online DB
	vJSONDB_Offline["LastSyncLine"] = -1;
	if (vJSONDB["DBformat"]) {
		vJSONDB_Offline["DBformat"] = copy_array(vJSONDB["DBformat"]);
		//vJSONDB_Offline["DBtitles"] = vJSONDB["DBtitles"];
	} else {
		console.log("Init of vJSONDB_Offline failed, due to no DBformat definition of vJSONDB.");
		alert("No Database is loaded please go online to download DB format once for working OFFLINE.")
		//vJSONDB_Init["DBformat"] = ["email","username","geolocation","sampledate"];
	};
}

function saveLocalDB(pDBName,pJSONDB) {
  if (typeof(Storage) != "undefined") {
    // Store
    if (typeof(pJSONDB) != undefined) {
      console.log("JSON-DB '"+pDBName+"' is defined, JSONDB in  Local Storage");
      if (pJSONDB) {
        console.log("pJSONDB '"+pDBName+"' is saved to Local Storage");
        localStorage.setItem(pDBName,JSON.stringify(pJSONDB));
      } else {
        console.log("pJSONDB DOM-Node is NOT defined");
      }
    } else {
      console.log("pJSONDB is undefined");
    };
  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  }
}

function saveLocalVar(pKey,pValue) {
 if (typeof(Storage) != "undefined") {
    // Store
    localStorage.setItem(pKey,pValue);
		console.log("Save Local Variable: ["+pKey+"]='"+pValue+"'");

  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  }
};

function loadLocalVar(pKey) {
 var vReturn = "";
 if (typeof(Storage) != "undefined") {
    // Load
  	if (typeof(localStorage.getItem(pKey)) != undefined) {
      console.log("Variable ["+pKey+"] loaded from Local Storage");
      vReturn = localStorage.getItem(pKey);
    } else {
      console.log("Variable ["+pKey+"] is undefined in Local Storage");
    };
  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  };
	return vReturn
};
