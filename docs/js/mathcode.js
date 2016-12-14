function divmod(pDividend,pDivisor) {
  var vQuotient = 0;
  if (pDivisor > 0) {
      while (pDividend > pDivisor) {
        pDividend = pDividend - pDivisor;
        vQuotient++;
      }
  } else {
    console.log("ERROR (divmod): Divisor is not greater 0");
  };
  return vQuotient;
};

function weightedMean(pValueArr,pWeightArr) {
  // returns a hash of calculated results
  var vReturn = {"mean":0.0,"missing":0,"arrlength":0,"success":false};
  if (pValueArr) {
    if (pWeightArr) {
      if (pValueArr.length == pWeightArr.length) {
        vReturn = weightedMean_calc(pValueArr,pWeightArr)
      } else {
        console.log("weightedMean()-Error: Array length does not match");
      };
    } else {
      console.log("ERROR in weightedMean() - 'pWeightArr' undefined");
    }
  } else {
    console.log("ERROR in weightedMean() - 'pValueArr' undefined");
  }
};

function weightedMean_calc(pValueArr,pWeightArr) {
  // IMPORTANT pValueArr und pWeightArr are array of strings
  // returns a hash of calculated results
  // {"mean":824.232,"missing":2,"arrlength":10,"success":true}
  var vReturn = {"mean":0.0,"missing":0,"arrlength":0,"success":false};
  var vSum = 0.0;
  var vSumWeight = 0.0;
  var vMissing = 0.0;
  var vValue = 0.0;
  var vWeight = 0.0;
  for (var i = 0; i < pValueArr.length; i++) {
    if (pValueArr[i] == "NA") {
      vMissing++;
    } else if (pValueArr[i] == "") {
      vMissing++;
    } else {
      vValue = parseFloat(pValueArr[i]);
      vWeight = parseFloat(pWeightArr[i]);
      vSum =  vValue * vWeight;
      vSumWeight += vWeight;
    };
  };
  if (vSumWeight != 0.0) {
    var vMean = vSum/vSumWeight;
    vReturn = {"mean":vMean,"missing":vMissing,"arrlength":pValueArr.length,"success":true};
  };
  return vReturn;
};

function fuzzyNOT(pValueArr) {
  var vRetArr = [];
  for (var i = 0; i < pValueArr.length; i++) {
    vRetArr.push(1-pValueArr[i]);
  };
};

function fuzzyCHECK_value(pValueArr) {
  var vRet = [];
  for (var i = 0; i < pValueArr.length; i++) {
    vRet.push((pValueArr[i]<= 1.0) && (pValueArr[i]>=0.0));
  };
  return vRet;
};

function fuzzyPARSE_string(pStringArr) {
}

function fuzzyAND_mult(pValueArr) {
  var vRet = 1.0;
  for (var i = 0; i < pValueArr.length; i++) {
    vRet *= pValueArr[i];
  };
  return vRet;
};

function fuzzyOR(pValueArr) {
  //return fuzzyOR_generic(pValueArr)
  return fuzzyOR_max(pValueArr);
};

function fuzzyAND(pValueArr) {
  return fuzzyAND_min(pValueArr);
};

function fuzzyAND_mult(pValueArr) {
  var vRet = 1.0;
  for (var i = 0; i < pValueArr.length; i++) {
    vRet *= pValueArr[i];
  };
  return vRet;
};

function fuzzyOR(pValueArr) {
  return fuzzyOR_generic(pValueArr)
};

function fuzzyOR_generic(pValueArr) {
  var vRet = 1.0 - fuzzyAND_mult(fuzzyNOT(pValueArr));
  return vRet;
};

function fuzzyAND_min(pValueArr) {
  var vRet = pValueArr[0];
  for (var i = 1; i < pValueArr.length; i++) {
    if(vRet > pValueArr[i]) {
      vRet = pValueArr[i]
    };
  };
  return vRet;
}

function fuzzyOR_max(pValueArr) {
  var vRet = pValueArr[0];
  for (var i = 1; i < pValueArr.length; i++) {
    if(vRet < pValueArr[i]) {
      vRet = pValueArr[i]
    };
  };
  return vRet;
}
