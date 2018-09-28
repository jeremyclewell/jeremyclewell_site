document.write('<script type="text/javascript" src="/scripts/bcbsr2008/prototype.js"></script>');
document.write('<script type="text/javascript" src="/scripts/bcbsr2008/scriptaculous.js"></script>');
document.write('<script type="text/javascript" src="/scripts/bcbsr2008/contentObject.js"></script>');
document.write('<script type="text/javascript" src="/scripts/bcbsr2008/swfobject.js"></script>');
document.write('<script type="text/javascript" src="/scripts/bcbsr2008/windows.js"></script>');

userAgent = window.navigator.userAgent;
browserVers = parseInt(userAgent.charAt(userAgent.indexOf("/")+1),10);
isIE = document.all ? true : false;
var baseZ = 1500;
var preloadFlag = false;
var currentPage = 1;
	var currentBodyScale = 1;
	var currentSliderWidth = 88;
	
	var animating = false;
var navImages = ["navItemOne", "navItemTwo", "navItemThree", "navItemFour", "navItemFive", "navItemSix", "navItemSeven"];
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function findElement(n,ly) {
	if (browserVers < 4)		return document[n];
	var curDoc = ly ? ly.document : document;
	var elem = curDoc[n];
	if (!elem) {
		for (var i=0;i<curDoc.layers.length;i++) {
			elem = findElement(n,curDoc.layers[i]);
			if (elem) return elem;
		}
	}
	return elem;
}
function changeImages() {
	if (document.images && (preloadFlag == true)) {
		var img;
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			img = null;
			if (document.layers) {
				img = findElement(changeImages.arguments[i],0);
			}
			else {
				img = document.images[changeImages.arguments[i]];
			}
			if (img) {
				img.src = changeImages.arguments[i+1];
			}
		}
	}
}

function preloadImages() {
if (document.images) {
		runner_1 = newImage("/images/custom/bcbsr2008/layout/runner_1.gif");
		runner_3 = newImage("/images/custom/bcbsr2008/layout/runner_3.gif");
		runner_4 = newImage("/images/custom/bcbsr2008/layout/runner_4.gif");
		runner_5 = newImage("/images/custom/bcbsr2008/layout/runner_5.gif");
		runner_6 = newImage("/images/custom/bcbsr2008/layout/runner_6.gif");
		runner_7 = newImage("/images/custom/bcbsr2008/layout/runner_7.gif");
		runner_1png = newImage("/images/custom/bcbsr2008/layout/runner_1.png");
		runner_3png = newImage("/images/custom/bcbsr2008/layout/runner_3.png");
		runner_4png = newImage("/images/custom/bcbsr2008/layout/runner_4.png");
		runner_5png = newImage("/images/custom/bcbsr2008/layout/runner_5.png");
		runner_6png = newImage("/images/custom/bcbsr2008/layout/runner_6.png");
		runner_7png = newImage("/images/custom/bcbsr2008/layout/runner_7.png");
		footer_1 = newImage("/images/custom/bcbsr2008/layout/f_photo_gst.jpg");
		footer_1_over = newImage("/images/custom/bcbsr2008/layout/f_photo_gst2.jpg");
		footer_2 = newImage("/images/custom/bcbsr2008/layout/f_photo_ch.jpg");
		footer_2_over = newImage("/images/custom/bcbsr2008/layout/f_photo_ch2.jpg");
		
		preloadFlag = true;
		document.getElementById("content").innerHTML = contentObj[0].html;
		if(document.location.hash) pageTurn((document.location.hash).slice(-1));
	}
}
function killBubbles(e){
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();   
		}

function navOver(navItem, e){
	killBubbles(e);
	for (i=0;i<navImages.length;i++) {
		document.getElementById(navImages[i]).style.visibility = "hidden";
	}
	
	//new Effect.Appear(navItem,{duration: .15});
	document.getElementById(navItem).style.visibility = "visible";
	}
function navOut(navItem, e){
	killBubbles(e);
	document.getElementById(navItem).style.visibility = "hidden";
	//new Effect.Fade(navItem,{duration: .15});
	}




	
	var pageTurn = function(pageNum) {
	
	
			
		if (currentPage==pageNum || animating) return false;
		currentPage = pageNum;
		window.frames.multimedia.startTransition(currentPage);
		animating = true;
		
		
		var contentSrc = "page"+pageNum;
		var newSliderWidth = document.getElementById(navImages[pageNum-1]).width;
		var scaleSliderBy = (newSliderWidth/currentSliderWidth)*100;
		currentSliderWidth = newSliderWidth;
		var sliderPos = document.getElementById('navSlider').offsetLeft;
		var newSliderPos = isIE ? document.getElementById(navImages[pageNum-1]).offsetLeft+6 : document.getElementById(navImages[pageNum-1]).offsetLeft;
		var moveSliderBy = (newSliderPos<sliderPos) ? -(sliderPos-newSliderPos) : (newSliderPos-sliderPos);
		
		
		
		var newBodyScale = contentObj[pageNum-1].size;
		relationalBodyScale = (newBodyScale/currentBodyScale)*100;
		currentBodyScale=newBodyScale;
		function reappear() {
			document.getElementById("content").innerHTML = contentObj[pageNum-1].html;
			new Effect.toggle('content', 'appear',{ delay: 1.25, duration: .25, afterFinish: function(o) {animating = false;}});
			
		}
		new Effect.MoveBy('navSlider', 0, moveSliderBy,  {duration: .5});
		new Effect.Scale('navSlider', scaleSliderBy ,{scaleY: false, duration: .5});
		new Effect.toggle('content', 'appear', { duration: .25, afterFinish: function(o) {reappear();}});
		new Effect.Scale('wrapper', relationalBodyScale ,{scaleX: false, scaleContent: false, duration: 1, delay: .5});
		
		
	document.location.hash = (pageNum);	
	
	
	}
	
	
		
	
	
	
	
	
	
	
	
	
	
