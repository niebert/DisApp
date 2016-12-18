<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [DisApp](#disapp)
  - [Introduction](#introduction)
  - [Core Approach of Software Development](#core-approach-of-software-development)
  - [Explored Features in Demo](#explored-features-in-demo)
  - [Development Cycle](#development-cycle)
    - [alpha-Version: Web-App](#alpha-version-web-app)
  - [Explored Features in Detail](#explored-features-in-detail)
    - [Create a Server Call with Javascript](#create-a-server-call-with-javascript)
    - [Generate the URL for a Server Call with Javascript](#generate-the-url-for-a-server-call-with-javascript)
    - [Submit Data to HTML pages with the URL](#submit-data-to-html-pages-with-the-url)
    - [Check the Online Mode of an App](#check-the-online-mode-of-an-app)
    - [HTTPS Servers to deploy Web-Apps](#https-servers-to-deploy-web-apps)
  - [Setup of DisApp Repository](#setup-of-disapp-repository)
  - [Library](#library)
  - [Acknowledgements](#acknowledgements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*
# DisApp
## Introduction ##
Disease App - Demo of Features for Crowd Sourcing and Spatial Risk Assessment, with
and basic Fuzzy-Logic Feedback system, that allows client-side analysis of questionnaire for individual responsess.
* Sources are in HTML/Javascript so that **Desktop**, **Mobile Phone** and **Web-Apps** can be created from the same code base.
* **Mobile Device Apps:** Compiler [Intel XDK](https://software.intel.com/en-us/xdk/videos/intel-xdk-app-designer) (Android, iOS, ...) Apps, [Cordova](https://www.tutorialspoint.com/cordova/), ...
* **Desktop Application:** with [Electron](http://electron.atom.io/)
* **Server Application:** e.g. create simple [Server with Electron](https://gist.github.com/bellbind/6ae79ebef25504107650))

## Core Approach of Software Development ##
Share the same code base for
* Desktop Applications (e.g. Electron)
* Server Applications that handle the Client-Server-Interactions
* Mobile Device App Development
* Web-Apps
We can think of these *application types* as a container for  our web app with
* accessing the file system of the device
* connecting with native mobile functionalities (GPS, Camera, SD-Card, Mircophone, ...).
* performing server task with other OpenSource Software
  * Statistical Analysis with [R](https://www.r-project.org/)
  * Geograhic Information Systems [GRASS](https://grass.osgeo.org/)
  * Document Converting with [PanDoc](https://niebert.github.com/PanDocElectron)

## Explored Features in Demo ##
* **[AppCache](http://www.w3schools.com/html/html5_app_cache.asp)** to allow Offline use of the Web-App on the Mobile Device. A script `appcache_filecollect.pl` collects all files in the subdirectory `/docs` and adds them to the AppCache manifest `docs/disapp.appcache`. This perl script simplifies the management of the AppCache manifest, when libraries and files are added. When you miss files in the appcache (e.g. an icon) that the icon or the background is missing, when the users wants to use the app in offline mode.
* **[LocalStorage](http://www.w3schools.com/html/html5_webstorage.asp)** to store data on the device in the browser, when the App is Offline and running from the AppCache.

## Development Cycle ##
### alpha-Version: Web-App ###
* (**[alpha](https://niebert.github.com/DisApp)**): Rapid Prototyping, Generate a *Look and Feel* for user groups from the very beginning. Deployment in the `docs/` Folder of the Github repository is available on the url:
[`https://niebert.github.com/DisApp`](https://niebert.github.com/DisApp)
It uses the browser LocalStorage to store data on the client and uses call of remote Javascript Libraries and a JS Timeout Command to communicate with the Server. It works like a remote call of e.g. [JQuery](https://jquery.com). The JS-Timeout Call waits until a defined time of milliseconds and checks if a certain ResultDB-Hash is existing, that contains the returned data from the server. To submit data to the server, the SRC-Attribute with the remote javascript libraries has additional parameters that are evaluated on the server. Normally the Website will expect javascript code as a returned content, so the server has to generate proper Javascript Code. The benefit of this strategy is, that the server can add additional functionality to the app.
* **IMPORTANT NOTICE for alpha-Version:** Users must trust the remote server and the maintainers of the server, that they do not inject malicious code in the response javascript code. The calls of the javascript code should be performed in a HTTPS-call and the parameters of the call should be encrypted on the client side (e.g. `par1=Firstname&par2=Lastname&...` into * `encryptpars=82hl324o823llj405443l9EJDL9ERKRkdlsHjsdasku7758...`) this adds an additional security layer on the client server communication.
### beta-Version: ODK Connected ###
* (**beta**): The beta-Version allows the communication to [OpenDataKit](https://opendatakit.org), to allow communication with an well developed OpenSource project for questionnaire management and Online and Offline data collection. The proposed developement of ODKJS API allows the client server communication with the ODK server. The developed App allows the design of tailored response to the users that submit data to the ODK server. In a Citizen Science Approach for Risk Management Convert the code base into an Object Oriented Model.
* (**ODKJS OpenDataKit-Javascript Package**) The OpenDataKit Javascript Package is written in Javascript and the package is able to interact with an ODK Server. Altering the Server the users wants to connect to should be visible in the app so that the users can decide, if she/he trusts the maintainers of the server (injection of malicious code through the remotely called Javascript Libraries from the server). The Package ODKJS should be developed in a separate repository and it should contain a basic wrapper for a web application that uses the OKDJS for interacting with the default OpenDataKit server infrastructure. `aODKJS` is regards as an attribute of a javascript class for the application (e.g. `vApp = new WebApp()` (not implemented yet)). The variable `vApp` is an instance of the class `WebApp` (see [JavascriptClassGenerator](https://niebert.github.io/JavascriptClassCreator/) for creating you own classes). The Class `WebApp` creates with the method `vApp.init()` an ODKJS attribute `vApp.aQuestionnaire` as an instance of `ODKJS` by `this.aQuestionnaire = new ODKJS()` ). Main features of `ODKJS` are:
  * **aQuestionnaire.getServerList(pURL)** Downloading a list of available questionnaires from the ODK server defined by `pURL`. Stores the list (returned JSON file) as Hash in `aQuestionnaire.aQuestList`.
  * **aQuestionnaire.getQuest(pQuestID)** Select a particular questionnaire from that list by the mobile device user and start the download of that questionnaire.
  * store the downloaded questionnaire in the LocalStorage of the browser
  * start collecting data by the user in Online or Offline mode. The collected data are stored as JSON files in the `[LocalStorage](http://www.w3schools.com/html/html5_webstorage.asp)` of the Client.
  * delete a downloaded questionnaire from the LocalStorage of the browser
  * In Online mode the App submits the collected data of the selected questionnaire directly to the ODK server and marks the record in the LocalStorage as `submitted`.
  * create a list of unsubmitted records in the  `[LocalStorage](http://www.w3schools.com/html/html5_webstorage.asp)`. This list is necessary to submit unsubmitted data to the server.

## Explored Features in Detail ##
### Create a Server Call with Javascript ###
In GitHub folder `/docs/js/syncserver.js` you find a Javascript functions that creates a script tag and appends the script tag to DOM element with the `id=divJSCALL` in HTML page.
```
function submitJSON_exec(pURL)
{
    // submitJSON() loads a javascript lib from Server
    // that return a JS Lib with a hash variable vReturnDB
    // vReturnDB looks like this:
    // -------------------------------------
    // vReturnDB = {};
    // vReturnDB['database']='disapp.db';
    // vReturnDB['error']='';
    // vReturnDB['message']='';
    // vReturnDB['sampledate']='1481621434186';
    // -------------------------------------
    // sampledate is set as milli seconds since 1.1.1970
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = pURL;
    s.innerHTML = null;
    s.id = "js"+Date.now();
    s.name = "name"+Date.now();
    document.getElementById("divJSCALL").innerHTML = "";
    document.getElementById("divJSCALL").appendChild(s);
    //document.location.href =pURL;
    console.log("submitJSON() creates SCRIPT-Tag with name='"+s.name+"'");
    setTimeout('checkSubmitSuccess()',5000);
};
```
The parameter *pURL* contains a server call with parameters e.g.
```
 https://myserver.example.com/submitmyname.php?par1=Firstname&par2=Lastname
```
The function `checkSubmitSuccess()` is called after 5 seconds and checks if the hash variable `vReturnDB` is existing in DOM of the HTML page.
```
function checkSubmitSuccess() {
   if (typeof(vReturnDB) !== 'undefined') {
     //do something with the Hash of the Server Response
   } else {
     // do something when the server response was NOT successful
     // i.e. Mobile Device is offline
   };
};
```
The function `checkSubmitSuccess()` is defined in the library `/docs/js/syncserver.js` as well.

### Generate the URL for a Server Call with Javascript ###
The app uses a variable `app_submiturl` that is submitted to the from the [Login-Screen of the App](https://niebert.github.com/DisApp) to the app via HTTPS (e.g. `https://myserver.example.com/submitmyname.php`). To this submit URL the parameters are  concatenate with the function `record2URLparam()` for the server call.  
```
function record2URLparam(pDBHash) {
  var vParam = "";
  for (var iID in pDBHash) {
    vParam += "&"+iID+"="+encodeURIComponent(pDBHash[iID]);
  };
  return vParam;
}
```
### Submit Data to HTML pages with the URL###
The communitation between html-files are realized with URL parameters as well.
```
 .../submitname.html?par1=Firstname&par2=Lastname
```
To decode the URL parameter the function `readQueryParams()` that takes the parameters of the HTML file `document.location.search` and passes the string to the function `getQueryParams()` in the library `js/htmlrequest.js`. The function `getQueryParams()` return a hash with all the parameters.
```
function readQueryParams() {
   //alert(document.location.search);
   return getQueryParams(document.location.search);
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
```
For the example `submitname.html`
```
.../submitname.html?par1=Firstname&par2=Lastname
```
The function `getQueryParams()` return a hash with the parameters that can be accessed as usual, when you apply the hash-concept in programming languages.
```
var vQueryHash = readQueryParams();
alert(vQueryHash['par1']);   // will show 'Firstname'
alert(vQueryHash['par2']);   // will show 'Lastname'
```
### Check the Online Mode of an App ###
For the functionality of Online/Offline mode of an App it is important, that the HTML in the browser can access certain server resources or check if the device is Online or Offline in general to explore an implementation of an app, we tested an iFrame in the web pages for that purpose.

The following code is used in the main document of the HTML file. The iFrame websites are loaded from a subfolder `docs/loader`. All html files in that folder can be loaded dynamically in the iFrams with the `id="iLoader"`.
```
<div id="iFrameContainer" style="display:none">
  <iframe id="iLoader" src="loader/setonline.html" width="90%" height="100" name="iLoader"></iframe>
</div>
```
The loader `loader/setonline.html` checks the online mode. The HTML file creates a remote call for a library and performs specific tasks when the remote resource is accessible and other task when the response was not successful.
```
var vCallJS = "https://niebert.github.io/DisApp/loader/onlinecheck.js";
console.log("CALL: setonline.html with "+vCallJS);

function submitJSON(pURL)
{
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = pURL;
    s.innerHTML = null;
    s.id = "js"+Date.now();
    s.name = "name"+Date.now();
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").appendChild(s);
};

function checkIfSuccess() {
  if (typeof(vConnectStatus) !== 'undefined') {
    alert("ONLINE");
    top.setSelectOnline(true);
  } else {
    alert("OFFLINE");
    top.setSelectOnline(false);
  } ;
}

setTimeout("checkIfSuccess()",5000);
```
The remote Javscript library `https://niebert.github.io/DisApp/loader/onlinecheck.js` will be loaded. This remote library does not contain very much. Just a hash for the connection status (content of `docs/loader/onlinecheck.js` is included in the repository).
```
var vConnectStatus = {};
vConnectStatus["OnlineMode"] = true;
```
To access a function in the parent window of iFrame a function `top.setSelectOnline(pOnline)` is called. The DOM object `top` indicates that the function is defined in the parent HTML page (i.e. `disapp.html`).

### HTTPS Servers to deploy Web-Apps ###
It is a requirement to encrypted HTTPS-calls, especially when personalized information like e-mail, names, ... are submitted. Encryption of URL parameters an decoding on the Backend server add additional security to client server interaction.

## Setup of DisApp Repository ##
The GitHub repository is setup in way that the `/docs` subfolder is used as a server root for `https://niebert.github.com/DisApp`. This can be accomplished by going to
* **Settings** (of the repository)
  * **Options** (left menu)
    * **GitHub Pages** (scroll down on Options page)
      * **Source** (select `master branch docs folder`)

## Library ##
* **fuzzycontrol.js**  The library `fuzzycontrol.js` contains the fuzzy controller for calculating the reponse for the uses. This is the only lib that was generated in the Object Oriented way  (see [JavascriptClassGenerator](https://niebert.github.io/JavascriptClassCreator/))
* **fuzzymain.js**  The library `fuzzymain.js` contains functions for calculating Fuzzy `AND`, `Fuzzy OR`, `Fuzzy NOT`.
* **geolocation.js**  The library `geolocation.js` contains functions to retrieve a GPS location even by the IP address of the client.
* **htmlrequest.js**  The library `htmlrequest.js` contains functions for handling the QueryString and URL parameters.
* **jquery*.js**  The library `jquery*.js` contains the [JQuery](http://www.jquery.com) package
**jquery.mobile.*.js**  The library `jquery*.js` contains the [JQuery Mobile](https://jquerymobile.com/) package
* **jsondb.js**  The library `jsondb.js` contains functions for handling a JSON Database
* **leaflet.js**  The library `leaflet.js` contains the package [LeafLetJS](http://leafletjs.com/) for displaying maps in a HTML page. The package can be replace by [OpenLayers](https://openlayers.org) if the feature analysis of **Leaflet** (see  [LL examples](http://leafletjs.com/examples.html) and [LL plugins](http://leafletjs.com/plugins.html)) and **OpenLayers** (see [OL examples](https://openlayers.org/en/latest/examples/)) indicates a preference of OpenLayer as on OpenSoure mobile friendly package of interactive maps.
* **leaflet4location.js**  The library `leaflet4location.js.js` contains functions for displaying a leaflet map for current geolocation.
* **localstorage.js**  The library `localstorage.js` contains functions for handling JSON database with the `[LocalStorage](http://www.w3schools.com/html/html5_webstorage.asp)`
* **login.js**  The library `login.js` contains functions for login to the main window of the app or in general to authenticate to remote server. In this DisApp example it is implemented in way that it supports a rapid prototype for the alpha-version of DisApp.
* **openwin.js**  The library `openwin.js` contains functions for opening new browser windows with a specific size and URL.
* **settings.js**  The library `settings.js` contains functions for initialisation of DOM variable provide by the QueryString from `htmlrequest.js`
* **showhide.js**  The library `showhide.js` contains functions for showing and hiding DOM elements in the HTML page. DOM elements need to have an `id="myID"` in the tag to hide and display them. The following examples show the basic functionality of those functions.  
```
<script src="js/showhide.js"></script>

<button id="bShow" onclick="show('myText')"> Show Text </button>
<button id="bHide" onclick="hide('myText')"> Hide Text </button>

<div id="myText" style="display:none">Hidden Text</div>
```
* **string.js**  The library `string.js` contains functions for string manipulation
* **syncserver.js**  The library `syncserver.js` contains functions for syncing a questionnaire with a server.
* **urlgen.js**  The library `urlgen.js` contains functions for creating a URL with parameters from a hash.
* **writedom.js**  The library `writedom.js` contains functions for writing dynamically in the content of a webpage.
```
<html>
  <body>
    <script src="js/writedom.js"></script>

    <button id="bShow" onclick="write2value('myInput','Hello Input')">
      Set Input
    </button>

    <button id="bHide" onclick="write2innerHTML('myText','Hello World')">
      Set Text
    </button>

    <input type="text" id="myInput" value="my default text as input" />

    <div id="myText">
      My default text in HTML
    </div>
</body>
</html>
```
The example can be used to test the functions. The library is mainly implemented to write debugging information into console of the browser. This was helpful during prototyping (e.g. missing IDs or typos in IDs when these functions write dynamically to the DOM of you web site)

## Acknowledgements ##
* [JQuery Mobile](http://themeroller.jquerymobile.com) used for GUI Development, for sharing a multipurpose HTML5 environment to handle the GUI in Apps.
* we follow the work of git-flow by http://danielkummer.github.io/git-flow-cheatsheet/ (recommendation to use in DisApp by Suraj Shah).
* **iOS-Inspired jQuery Mobile theme** by [@taitems](http://twitter.com/taitems). Resources at [GitHub page](https://github.com/taitems/iOS-Inspired-jQuery-Mobile-Theme).
* Blake Giradot ([Humanitarian Open Streetmap Team]() for supporting the OpenLayers integration)
* Ajit N. Babu for Work flow development
* Jitendra Shah for Support, Recommendations for Development
* Suray Shah for Backend Development
* Arnav Puri</b> for Backend/App Development, ODKJS API
* Chandana Unitthan for Project Management Support
* Joerg Rapp  Spatial Analysis
* Biju Soman for Public Health Support in Pilot Region
* Joseph Wain for iOS style Icons [http://www.glyphish.com](http://www.glyphish.com)  Licensed under the [Creative Commons Attribution 3.0 United States License](http://creativecommons.org/licenses/by/3.0/us/).
* **Javscript Minifier** in Perl to generate compressed javascript code that reduces disk space and (more important) download time of Web-Apps. The GitHub subfolder `/jsminifier` contains the javascript minifier (C) 2007 developed by Peter Michaux. This perl library is free software; you can redistribute it and/or modify it under the same terms as Perl itself, either Perl version 5.8.6 or, at your option, any later version of Perl 5 you may have available. This library will be used to compressed a documented javscript library for better performance.
