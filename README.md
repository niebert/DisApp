# DisApp
## Introduction ##
Disease App - Demo of Features for Crowd Sourcing and Spatial Risk Assessment, with
and basic Fuzzy-Logic Feedback system, that allows client-side analysis of questionnaire for individual responsess.
* Sources are in HTML/Javascript so that **Desktop**, **Mobile Phone** and **Web-Apps** can be created from the same code base.
* **Mobile Device Apps:** Compiler [Intel XDK](https://software.intel.com/en-us/xdk/videos/intel-xdk-app-designer) (Android, iOS, ...) Apps, [Cordova](https://www.tutorialspoint.com/cordova/), ...
* **Desktop Application:** with [Electron](http://electron.atom.io/)

## Core Approach of Software Development ##
Share the same code base for

## Development Cycle ##
* (**[alpha](https://niebert.github.com/DisApp)**): Rapid Prototyping, Generate a *Look and Feel* for user groups from the very beginning. Deployment in the **docs/** Folder of the Github repository is available on the url:
  * `https://niebert.github.com/DisApp`](https://niebert.github.com/DisApp)
It uses the browser LocalStorage to store data on the client and uses call of remote Javascript Libraries and a JS Timeout Command to communicate with the Server. It works like a remote call of e.g. [JQuery](https://jquery.com). The JS-Timeout Call Waits until a defined time of milliseconds and checks if a certain ResultDB-Hash is existing, that contains the returned data from the server. To submit data to the server, the SRC-Attribute with the remote javascript libraries has additional parameters that are evaluated on the server. Normally the Website will expect javascript code as a returned content, so the server has to generate proper Javascript Code. The benefit of this strategy is, that the server can add additional functionality to the app.
* **IMPORTANT NOTICE for alpha-Version:** Users must trust the remote server and the maintainers of the server, that they do not inject malicious code in the response javascript code. The calls of the javascript code should be performed in a HTTPS-call and the parameters of the call should be encrypted on the client side (e.g. `par1=Firstname&par2=Lastname&...` into * `encryptpars=82hl324o823llj405443l9EJDL9ERKRkdlsHjsdasku7758...`) this adds an additional security layer on the client server communication.
* (**[beta]**): The beta-Version allows the communication to OpenDataKit, to allow communication with an well developed OpenSource project for questionnaire management and Online and Offline data collection. The proposed developement of ODKJS API allows the client server communication with the ODK server. The developed App allows the design of tailored response to the users that submit data to the ODK server. In a Citizen Science Approach for Risk Management Convert the code base into an Object Oriented Model.

## Explored Features in Demo ##
* **[AppCache](http://www.w3schools.com/html/html5_app_cache.asp)** to allow Offline use of the Web-App on the Mobile Device
* LocalStorage to store

## Create a Server Call with Javascript ##
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
 http://myserver.example.com/submitmyname.php?par1=Firstname&par2=Lastname
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

## Generate the URL for a Server Call with Javascript ##
The app uses a variable `app_submiturl` and concatenate the parameters to the server call. that can be submitted via the QueryString to the login screen of the App

## Acknowledgements ##
* [JQuery Mobile](http://themeroller.jquerymobile.com) used for GUI Development, for sharing a multipurpose HTML5 environment to handle the GUI in Apps.
* we follow the work of git-flow by http://danielkummer.github.io/git-flow-cheatsheet/ (recommendation to use in DisApp by Suraj Shah).
* **iOS-Inspired jQuery Mobile theme** by [@taitems](http://twitter.com/taitems). Resources at [GitHub page](https://github.com/taitems/iOS-Inspired-jQuery-Mobile-Theme).
* Ajit N. Babu for Work flow development
* Jitendra Shah for Support, Recommendations for Development
* Suray Shah for Backend Development
* Arnav Puri</b> for Backend/App Development, ODKJS API
* Chandana Unitthan for Project Management Support
* Joerg Rapp  Spatial Analysis
* Biju Soman for Public Health Support in Pilot Region
* Joseph Wain for iOS style Icons [http://www.glyphish.com](http://www.glyphish.com)  Licensed under the [Creative Commons Attribution 3.0 United States License](http://creativecommons.org/licenses/by/3.0/us/).
* Javscript Minifier in Perl to generate compressed javascript code that reduces disk space and (more important) download time of Web-Apps.
