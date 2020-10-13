# Zoom And Gallery
It provides a simple way to create the Image Zoom and Gallery.

**Compatible with  Android Chrome, iOS Safari, Chrome, Safari.**

## 1. Gallery View
Swipe image change and Pinch Zoom In and out

### Funstions

* `setContents` Set the image URL array. `Param` {contents:,position:}
				   
* `setPosition ` Set the page location.  `Param` {position:,animation:}

* `getPosition`  Get Current page location.

* `addData` Add a image URL.

* `setFixWidth`  Set Horizontal Fit Image(true), Vertical Fit Image(false).
tsme

*  `getCount`  Get the number of galleries.

*  `getAt`  Get gallery information to the index.

### Events
*   `setEvent` Set Event Functions


###  HTML Sample
```
<div class='mtlGalleryView' 
     contents="['img/1.jpg','img/2.jpg','img/3.jpg']" 
     fixwidth="false" >
```

### Javascript Functions Sample
```
<script>
$( document ).ready(function() {
	//Data
	var arrData = ['img/1.jpg','img/2.jpg','img/3.jpg'];
	//Event
	$('#sample').GalleryView('setEvent',{onChange: function(element,pos) {}});    
	$('#sample').GalleryView('setContents',{contents:arrData,position:0});
});
</script>
<div id='sample'></div>
```

	
	
## 2. Image View
Pinch and Double touch Zoom In&out

### Funstions

* `load` Set the image URL.
				   
* `setfixwidth ` Set the image screen fit.

* `getFixWidth`  Get information to fit the image screen.

###  HTML Sample
```
<div class='mtlImageView' src="img/6.jpg" fixwidth=true >
```
### Javascript Functions Sample
```
<script>
$( document ).ready(function() {
	$('#sample').ImgView('load',{url:'img/1.jpg'});
	$('#sample').ImgView('setfixwidth',false);}

});
</script>
<div id='sample'></div>
```


If you want more functions, please send me an e-mail ondraw@gmail.com
