// This file is called remotely from script
// and exclude from appcache manifest.
// When variable vOnlineMode exists the you have online Access
// <script src="https://niebert.github.com/DisApp/loader/onlinemode.js"></script>
// <script>
//  if (vReturnDB) {
//    alert("You are Online")
//  } else {
//   alert("You are offline")
//  };
// </script>
var vConnectStatus = {};
vConnectStatus["OnlineMode"] = true;
