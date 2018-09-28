function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function changeHeader() {
	/* 01.30.2007 - CMO */

	/* Define the array and populate it */
	var headerArray = new Array ();
	headerArray[0] = {imagePath:'images/layout/content_top_one.jpg' }
	headerArray[1] = {imagePath:'images/layout/content_top_two.jpg' }
	headerArray[2] = {imagePath:'images/layout/content_top_three.jpg' }
	headerArray[3] = {imagePath:'images/layout/content_top_four.jpg' }
	headerArray[4] = {imagePath:'images/layout/content_top_five.jpg' }
	headerArray[5] = {imagePath:'images/layout/content_top_six.jpg' }
	headerArray[6] = {imagePath:'images/layout/content_top_seven.jpg' }
	
	/* Determine the array length and create a random number based on it */
	var arrayLength = headerArray.length;
	var randomUnrounded=Math.random()*arrayLength;
	var randomNumber=Math.round(randomUnrounded); 	
	
	if (randomNumber >= arrayLength) {
		randomNumber-- ;
		}
	
	/* Change the image, text, and link */
	img = document.getElementById("randomImage");
	newImg = document.createElement("img");
	newImg.setAttribute("src",  headerArray[randomNumber].imagePath);
	img.appendChild(newImg);
	}
			
function cellColor(objRef, state) {
	objRef.style.backgroundColor = (1 == state) ? '#e7ecec' : '#fdfbfb';
	return;
}
function cellColor2(objRef, state) {
	objRef.style.backgroundColor = (1 == state) ? '#d1dada' : '#e7ecec';
	return;
}
