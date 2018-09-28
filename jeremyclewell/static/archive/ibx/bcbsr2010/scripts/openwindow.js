/*
openwindow.js - 1/10/08 - JAC
method summary - 
EVENT="return spawnWindow(keyword, loc, destWin);"
	keyword - "form", "mediasmall", "mediabig", "standard", "big", "max", or string of attributes, i.e., 'width=800,height=600,status=no,toolbar=no'.
	loc - 	  destination URL, i.e., "this.href" or "http://www.ibx.com".
	destWin - window.name property. Used to specify unique target window.
Documentation can be found at http://www.ibx.com/htdocs/generic_spawnwin_test.html
*/
function childWindow(strURL, strName, strChildType) {
	//var reName = new RegExp('[Ë†a-z]', 'gi');
	var e; //Dummy for Error Code
	
	//Property initialization
	this.url = strURL;
	this.name = strName;//.toString().replace(reName, '');
	this.childType = strChildType;
	this.child = null;
	this.alwaysRaised = 'no';
	this.copyhistory = 'yes';
	this.height = '';
	this.left = 0;
	this.location = 'no';
	this.menubar = 'no';
	this.resizable = 'yes';
	this.scrollbars = 'yes';
	this.status = 'yes';
	this.toolbar = 'yes';
	this.width = '';
	this.top = 0;	
	this.strAttributes = '';
	
	try {
		if (typeof this.childType != 'undefined') 
			switch(this.childType.toLowerCase()) {
				case 'form':
					this.width = 530;
					this.height = 400;
					this.status = 'no';
					this.toolbar = 'no';
					this.left = screen.availWidth/3;
					this.height = screen.availHeight/3;
					break;
				case 'mediasmall':
					this.width = 300;
					this.height = 300;
					this.resizable = 'no';
					this.scrollbars = 'no';
					this.status = 'no';
					this.toolbar = 'no';
					this.copyhistory = 'no';
					break;
				case 'mediabig':
					this.width = 500;
					this.height = 400;
					this.resizable = 'no';
					this.scrollbars = 'no';
					this.status = 'no';
					this.toolbar = 'no';
					this.copyhistory = 'no';
					break;
				case 'standard':
					this.width = 800;
					this.height = 600;
					this.location = 'yes';
					this.menubar = 'yes';
					break;
				case 'big':
					this.width = 1024;
					this.height = 768;
					this.location = 'yes';
					this.menubar = 'yes';
					break;
				case 'max':
					this.height = screen.availHeight-48;
					this.width = screen.availWidth-8;
					this.toolbar = 'no';
					break;
				case 'notice':
					this.width = 460;
					this.height = 460;
					this.location = 'yes';
					this.menubar = 'yes';
					break;
				default:
					this.strAttributes = this.childType.toLowerCase();
					//throw(null);
					break;
			}
		else 
			throw(null);		
	}
	catch(e) {
		this.height = 800;
		this.width = 600;
		this.menubar = 'yes';
		this.resizable = 'yes';
		this.scrollbars = 'yes';
		this.status = 'yes';
		this.toolbar = 'yes';
		this.location = 'yes';
	}
	
	function childWindowOpen() {
		var e;
		if (this.strAttributes.indexOf("alwaysRaised") == -1) this.strAttributes += 'alwaysRaised=' + this.alwaysRaised;
		if (this.strAttributes.indexOf("copyhistory") == -1) this.strAttributes += ',copyhistory=' + this.copyhistory;
		if (typeof this.height == 'number')
			if (this.height > 0 && this.strAttributes.indexOf("height") == -1)
				this.strAttributes += ',height=' + this.height;
		
		if (this.strAttributes.indexOf("left") == -1) this.strAttributes += ',left=' + this.left;
		if (this.strAttributes.indexOf("location") == -1) this.strAttributes += ',location=' + this.location;
		if (this.strAttributes.indexOf("menubar") == -1) this.strAttributes += ',menubar=' + this.menubar;
		if (this.strAttributes.indexOf("resizable") == -1) this.strAttributes += ',resizable=' + this.resizable;
		if (this.strAttributes.indexOf("scrollbars") == -1) this.strAttributes += ',scrollbars=' + this.scrollbars;
		if (this.strAttributes.indexOf("status") == -1) this.strAttributes += ',status=' + this.status;
		if (this.strAttributes.indexOf("toolbar") == -1) this.strAttributes += ',toolbar=' + this.toolbar;
		if (this.strAttributes.indexOf("top") == -1) this.strAttributes += ',top=' + this.top;
		
		if (typeof this.width == 'number' && this.strAttributes.indexOf("width") == -1)
			if (this.width > 0)
				this.strAttributes += ',width=' + this.width;
		
		//try to open a child window
		try {
			this.child = window.open(this.url, this.name, this.strAttributes);
			if (window.opener.name == this.name)
				this.child = window.opener;
			else 
				if (window.opener.opener.name == this.name)
					this.child = window.opener.opener;
				else
					if (window.opener.opener.opener.name == this.name)
						this.child = window.opener.opener.opener;
			this.focus();
		}
		catch(e) {
			this.focus;
		}
	}
	
	function childWindowClose() {
		var e;
		try {
			this.child.close();
		}
		catch(e) {}
	}
	
	function childWindowFocus() {
		this.child.focus();
	}
	
	//Method initialization
	this.open = childWindowOpen;
	this.close = childWindowClose;
	this.focus = childWindowFocus;
	
}

function spawnWindow(keyword, loc, destWin) {
	var child = new childWindow(loc, destWin, keyword);
	child.open();
	return false;
}



//
// Specialized calls migrated from old script - JC
//
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
	var ExternalWindow = window.open(url, "BigWindow","width=800,height=600,location=yes,menubar=yes,scrollbars=yes,toolbar=yes,resizable=yes");
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
  
  var ExternalWindow = window.open(modUrl, "BigWindow", "width=800,height=600,location=yes,menubar=yes,scrollbars=yes,toolbar=yes,resizable=yes");
  return false;
} // end spawnSecureWindow

function spawnFlexPlanWindow(url) {
  if (!url) { return false; }
  var modUrl = url;
  
  // DEBUG: override hostname detection
  // secureServerCurr = "";
  
  if (typeof secureServerCurr != "undefined") {
    modUrl = url.substr(0, url.indexOf(secureServerLive));
    modUrl += secureServerCurr;
    modUrl += url.substr(url.indexOf(secureServerLive) + secureServerLive.length);
  }
  
  var ExternalWindow = window.open(modUrl, "FlexPlanWindow", "width=750,height=525,location=yes,menubar=yes,scrollbars=yes,toolbar=yes,resizable=yes");
  return false;
} // end spawnFlexPlanWindow

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
function newWindow(url,w,h)
	{
	var winProps = 'width=' + w + ',' + 'height=' + h + ',' + 'resizable=yes,scrollbars=yes';
	window.open(url, 'new', winProps);
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
