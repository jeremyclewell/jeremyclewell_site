/**
 * NAME: spawn<qualifier>Window
 * INPUT: (_)url	- The url to include in the new window. Ex. 'helloworld.html'
 * PURPOSE:	Allow standard pop up windows
 * EXAMPLE: This anchor is an example of how to integrate this function.
 *   <a href="<href>" onclick="return spawn<qualifier>Window('helloworld.html')">Greeting</a>
 */
 
 
 
// 1/28/2005 - bahnck
function spawnWindow(keyword, loc, destWin, loginBox) {
	var winName = (destWin) ? destWin : "BigWindow";
	var extWin;
	var winAttStr;
 
  switch (keyword) {
  		case "php":
  		case "full":
  		case "pdf":
  		case "external":
 		case "standard":
  		winAttStr = "width=800,height=600,location=yes,menubar=yes,scrollbars=yes,toolbar=yes,resizable=yes";
  		break;
  		case "hf":
  		case "demo":
  		case "mediaBig":
  		winAttStr = "width=400,height=240,location=no,menubar=no";
  		break;
  		case "aol":
  		case "video":
  		case "definition":
  		case "mediaSmall":
  		winAttStr = "width=300,height=300,location=no,menubar=no";
  		break;
  		case "ebilling":
  		case "form":
		winAttStr = "width=530,height=400,location=no,menubar=no,scrollbars=yes,status=no,toolbar=no,resizable=yes";
		break;
		case "disclaimer":
		spawnDisclaimerWindow(loc);
		return false;
		break;
		case "login":
		spawnLoginWindow(loginBox);
		return false;
		break;
		case "secure":
		case "flex":
		spawnSecureWindow(loc);
		return false;
		break;
		default:
		  winAttStr = keyword;
	} // end switch
	
	extWin = window.open(loc, winName, winAttStr);
	return false;
	
} // end spawnWindow
 
 
// 1/21/2005 - bahnck
function spawnDisclaimerWindow(destPage) {
  if (!(destPage)) { return false; }
  var newWin = window.open("/htdocs/legal/external_link_disclaimer.html" + "?dest=" + destPage, "discWindow");
}
 
function disclaimerProceed() {
  if (location.search != "?" && location.search != "") {
    location.href = location.search.substring(6);  
  }
  return false;
}
 
 
function spawnExtWindow(url) {
	var ExternalWindow = window.open(url, "BigWindow","width=820,height=400,location=yes,menubar=yes,scrollbars=yes,toolbar=yes,resizable=yes");
	return false;
}
 
/**
 * Added 10/15/2004 - bahnck
 * Rewrites ibxpress login page hostname based on current hostname. If on live
 * or unrecognized server, this opens the url passed unmodified.  
 */
function spawnLoginWindow(loginBox) {
  if (!loginBox) { return false; }
  
  // DEBUG: override hostname detection
  // loginServerCurr = "";
  
  if (typeof loginServerCurr != "undefined") {
    loginBox.action = loginServerCurr;
  }
  // loginBox.target = "_blank";
 
  return true;
} // end spawnLoginWindow 
 
/**
 * Added 10/01/2004 - bahnck
 * Rewrites form page hostname based on current hostname. If on live
 * or unrecognized server, this opens the url passed unmodified.  
 */
 
function spawnSecureWindow(url) {
  if (!url) { return false; }
  var modUrl = url;
  
  // DEBUG: override hostname detection
  // secureServerCurr = "";
  
  if (typeof secureServerCurr != "undefined") {
    modUrl = url.substr(0, url.indexOf(secureServerLive));
    modUrl += secureServerCurr;
    modUrl += url.substr(url.indexOf(secureServerLive) + secureServerLive.length);
  }
  
  var ExternalWindow = window.open(modUrl, "BigWindow", "width=600,height=400,location=yes,menubar=yes,scrollbars=yes,toolbar=yes,resizable=yes");
  return false;
} // end spawnSecureWindow
 
function closeWindow() {
	self.close();
}
 
function openInParent(sURL) {
	window.opener.location.href = sURL;
	self.close();
}
 
function jumpToSubmit(){
	//alert("here should be");
    var index1= document.getElementById("findPlanCoverage").selectedIndex;
    var index2 =document.getElementById("findPlanState").selectedIndex;
	if((index1 >0)&& index2>0  ){	 	  	
	 	 document.getElementById("findaPlan").submit();
	 	 }
}
 
function jumpTo(what,size){
	var size = size;
	//alert("size="+size);
    var index =what.selectedIndex;
   // alert(index);
	if(index >0 ){	
		 document.getElementById("planCoverage").value = size;
		 document.getElementById("planState").value = what.value;
		// alert(document.getElementById("planState").value );
		//alert(document.getElementById("findaPlan").action);
	 	 document.getElementById("findaPlan").submit();
	 	 }
}
 
function backPlanSearchResult(){
	var strHref = window.location.href;	
	var index ;	 
	var state;
	var size;
	index = strHref.lastIndexOf("/");
	strHref = strHref.substring(0,index);	
	index = strHref.lastIndexOf("/");
	size = strHref.substring(index+1); 	
	strHref = strHref.substring(0,index); 	
	index = strHref.lastIndexOf("/");
	state = strHref.substring(index+1);
	var url = '../../searchPlanResults.html?planState='+state+'&planCoverage='+size;
	window.location.href = url;
	return false;
}
 