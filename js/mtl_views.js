//----------------------------- mtlImageView -------------------------------------
//options : {url:img/sss.png,fixwidth:true}
function mtlImageView(element,options)
{
  this.mIsLoaded = false;
  this.mContainElement = element;
  this.mImageElement = null;
  this.mOptions = options;
  this.Init();
}

mtlImageView.prototype.Init = function() {
  var clsThis = this;
  this.SetEvent();

  this.mContainElement.style.position = 'relative';
  //this.mContainElement.style.width = '100%';
  //this.mContainElement.style.height = '100%';
  this.mContainElement.style.overflow = 'auto';
  this.mContainElement.style.bakgroundColor = 'rgb(235,235,235)';

  this.mImageElement = new Image();
  this.mImageElement.style.position= 'absolute';
  this.mImageElement.style.left = '0';
  this.mImageElement.style.right = '0';
  this.mImageElement.style.top = '0';
  this.mImageElement.style.bottom = '0';

  this.mImageElement.onload = function()
  {
      clsThis.mIsLoaded = true;
      clsThis.StopWait();
      if(clsThis.mSize != null)
          clsThis.ResetAlign(clsThis.mSize.width,clsThis.mSize.height);
      else
          clsThis.ResetAlign();
  };
    this.mImageElement.onerror = function()
    {
        clsThis.StopWait();
    };
  this.mContainElement.appendChild( this.mImageElement );
  this.mImageElement.ondragstart = function() { return false; }; //드레그하지 못하게 막는다.
}

mtlImageView.prototype.StopWait = function()
{
  if(this.mWaitCursor)
  {
//    clearTimeout(this.mWaitCursor.mTimer);
    this.mContainElement.removeChild(this.mWaitCursor);
    this.mWaitCursor = null;
  }
}
//mtlImageView.prototype.Rotate = function(Angle)
//{
//	Angle += 36.5;
//    try
//    {
//    	this.mWaitCursor.style.transform = 'rotate('+Angle+'deg)';
//        //clsThis.mWaitCursor.style.webkitTransform = 'rotate('+Angle+'deg)';
//    	this.mWaitCursor.mTimer = setTimeout(this.Rotate(Angle),100);
//    }
//    catch(e)
//    {
//
//    }
//}

mtlImageView.prototype.StartWait = function()
{

  this.mWaitCursor = document.createElement( 'div' );
  this.mWaitCursor.style.position= 'absolute';
  this.mWaitCursor.style.left = '0';
  this.mWaitCursor.style.right = '0';
  this.mWaitCursor.style.top = '0';
  this.mWaitCursor.style.bottom = '0';
  this.mWaitCursor.style.width = '50px';
  this.mWaitCursor.style.height = '50px';
  this.mWaitCursor.style.borderColor='rgb(235,235,235)';
  this.mWaitCursor.style.borderWidth='8px';
  this.mWaitCursor.style.borderStyle='solid';
  this.mWaitCursor.style.margin = 'auto';
  this.mWaitCursor.style.borderRadius='50%';
  this.mWaitCursor.style.borderTop = '8px solid #3498db';

  this.mWaitCursor.className = ".ImgWaitCursor";

  //mWaitCursor.style.animation = 'spin 1s linear infinite';
//  var Angle = 0;
//  /*var clsThis = this;
//  var Rotate = function()
//  {
//    Angle += 36.5;
//    try
//    {
//    	clsThis.mWaitCursor.style.transform = 'rotate('+Angle+'deg)';
//        //clsThis.mWaitCursor.style.webkitTransform = 'rotate('+Angle+'deg)';
//        clsThis.mWaitCursor.mTimer = setTimeout(Rotate,100);
//    }
//    catch(e)
//    {
//
//    }
//  }
//  this.mWaitCursor.mTimer = setTimeout(Rotate);*/
//  this.mWaitCursor.mTimer = setTimeout(this.Rotate(Angle));
  this.mContainElement.appendChild(this.mWaitCursor);

}

mtlImageView.prototype.LoadImage = function(url)
{
  this.mImageElement.src = '';
  this.mIsLoaded = false;
  if(url != null && url.length > 0)
  {

      this.StartWait();
      this.mImageElement.src = url;
  }
  else
  {

      this.StopWait();
  }
}

mtlImageView.prototype.ResetAlign = function(nWidth,nHeight)
{
    var ConWidth = nWidth?nWidth:this.mContainElement.clientWidth;
    var ConHeight = nHeight?nHeight:this.mContainElement.clientHeight;

  var bFixWidth = (this.mOptions != null && this.mOptions['FixWidth'] != null) ? this.mOptions['FixWidth'] : true;
  var Rate = bFixWidth?this.mImageElement.naturalHeight/this.mImageElement.naturalWidth:this.mImageElement.naturalWidth/this.mImageElement.naturalHeight;
  var width  = bFixWidth? ConWidth : ConHeight*Rate;
  var height = bFixWidth ? Rate * ConWidth : ConHeight;

  if(bFixWidth) this.mContainElement.mWidth = width;
  else  this.mContainElement.mHeight = height;

  //크기가 작을때만 가운데로 해야 한다. 이미지가 크게 되면 센터로 위가 짤린다.
  if(height <= ConHeight) this.mImageElement.style.margin = 'auto';
  else if(width <= ConWidth) this.mImageElement.style.margin = '0 auto';
  else this.mImageElement.style.margin = '';

  this.mImageElement.style.width = width + 'px';
  this.mImageElement.style.height = height + 'px';

}

mtlImageView.prototype.DobleTouch = function(imgCon,X,Y)
{
  var clsThis = this;
   var bFixWidth = (this.mOptions != null && this.mOptions['FixWidth'] != null) ? this.mOptions['FixWidth'] : true;

  if(this.mContainElement.mDobleTouchCnt == null) {
    this.mContainElement.mDobleTouchCnt = 1;
    this.mContainElement.mClickTimer = setTimeout(function(){clsThis.mContainElement.mClickTimer = null;clsThis.mContainElement.mDobleTouchCnt = null;},300);
  }
  else this.mContainElement.mDobleTouchCnt = this.mContainElement.mDobleTouchCnt + 1;

  if(this.mContainElement.mClickTimer && this.mContainElement.mDobleTouchCnt == 2)
  {
    var Rate = bFixWidth?this.mImageElement.naturalHeight/this.mImageElement.naturalWidth:this.mImageElement.naturalWidth/this.mImageElement.naturalHeight;
    var width = 0;
    var height = 0;
    if(bFixWidth)
    {
	  width = this.mContainElement.mWidth * 2.0;
      //이미지가 화면보다 크게 스크롤되면 다시 작게 토글해준다.
      if(imgCon.mWidth > this.mContainElement.clientWidth) width = this.mContainElement.clientWidth;
      var Interval = width - this.mContainElement.mWidth;
      if(width < imgCon.clientWidth) width = this.mContainElement.clientWidth;
      else this.mContainElement.mWidth = width;
      height = Rate * width;
    }
    else
    {
      height = this.mContainElement.mHeight * 3.0;
      //이미지가 화면보다 크게 스크롤되면 다시 작게 토글해준다.
      if(this.mContainElement.mHeight > this.mContainElement.clientHeight) height = this.mContainElement.clientHeight;
      var Interval = height - this.mContainElement.mHeight;
      if(height < this.mContainElement.clientHeight) height = this.mContainElement.clientHeight;
      else this.mContainElement.mHeight = height;
      width = Rate * height;
    }

    /*에니메이션이 없이 표현할때...
    image.style.width = width + 'px';
    image.style.height = height + 'px';

    //크기가 작을때만 가운데로 해야 한다. 이미지가 크게 되면 센터로 위가 짤린다.
    if(height <= imgCon.clientHeight) image.style.margin = 'auto';
    else if(width <= imgCon.clientWidth) image.style.margin = '0 auto';
    else image.style.margin = '';
    setScrollX(imgCon,X,Interval,Rate);
    setScrollY(imgCon,Y,Interval,Rate);*/

    var beforW = this.mImageElement.clientWidth;
    var beforH = this.mImageElement.clientHeight;

    //애니메이션으로 각스템에 값을 가지고 스크롤을 다시 조정해주어야 한다.
    $(this.mImageElement).animate({width: width,height: height}, { duration: 300, step: function(pos,fn){
      if(fn.prop == 'width')
      {
        //크기가 작을때만 가운데로 해야 한다. 이미지가 크게 되면 센터로 위가 짤린다.
        if(clsThis.mImageElement.clientHeight <= clsThis.mContainElement.clientHeight) clsThis.mImageElement.style.margin = 'auto';
        else if(pos <= clsThis.mContainElement.clientWidth) clsThis.mImageElement.style.margin = '0 auto';
        else clsThis.mImageElement.style.margin = '';
        clsThis.setScrollX(X,pos-beforW);
        beforW = pos;
      }
      else
      {
        if(pos <= clsThis.mContainElement.clientHeight) clsThis.mImageElement.style.margin = 'auto';
        else if(clsThis.mImageElement.clientWidth <= clsThis.mContainElement.clientWidth) clsThis.mImageElement.style.margin = '0 auto';
        else clsThis.mImageElement.style.margin = '';
        clsThis.setScrollY(Y,pos-beforH);
        beforH = pos;
      }
     }});
  }
}

mtlImageView.prototype.SetFixWidth = function(bFixWidth)
{
  if(this.mOptions == null) this.mOptions = {};
  this.mOptions['FixWidth'] = bFixWidth;
  this.ResetAlign();
}
mtlImageView.prototype.GetFixWidth = function()
{
  return (this.mOptions && this.mOptions['FixWidth']) ? this.mOptions['FixWidth'] : true;
}
mtlImageView.prototype.isIOS = function(){
	   var isIOS = (/iPad|iPhone|iPod/.test(navigator.platform) ||
	(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
	!window.MSStream;
	   return isIOS;
	};
mtlImageView.prototype.isAndroid = function() {
  return /Android/i.test(navigator.userAgent);
}

mtlImageView.prototype.setScrollX = function(CenterX,Interval)
{
  var bFixWidth = (this.mOptions != null && this.mOptions['FixWidth'] != null) ? this.mOptions['FixWidth'] : true;
  //중간에서 지점 비율의 / 2 (/2 는 좌/우/상/하 가 존재 하기때문 즉 중앙에 클릭했을때를 생각해봐)
  var IntervalX = bFixWidth?Interval * CenterX / (this.mContainElement.clientWidth / 2) / 2:Interval * CenterX / (this.mContainElement.clientWidth / 2) / 2;
  this.mContainElement.scrollLeft = this.mContainElement.scrollLeft + IntervalX;
  if(this.mContainElement.scrollLeft < 0) this.mContainElement.scrollLeft = 0;
}

mtlImageView.prototype.setScrollY = function(CenterY,Interval)
{
  var bFixWidth = (this.mOptions != null && this.mOptions['FixWidth'] != null) ? this.mOptions['FixWidth'] : true;
  //중간에서 지점 비율의 / 2 (/2 는 좌/우/상/하 가 존재 하기때문 즉 중앙에 클릭했을때를 생각해봐)
  var IntervalY = bFixWidth?Interval * CenterY / (this.mContainElement.clientHeight / 2) / 2:Interval * CenterY / (this.mContainElement.clientHeight / 2) / 2;
  this.mContainElement.scrollTop = this.mContainElement.scrollTop + IntervalY;
  if(this.mContainElement.scrollTop < 0) this.mContainElement.scrollTop = 0;

}

//return 0x01:Can Right , 0x10:Can Left , 0x11 All SWipe , 0 : Can not SWipe
mtlImageView.prototype.canSWape = function()
{
	var Result = 0;
	var Right = this.mImageElement.clientWidth -  this.mContainElement.scrollLeft - this.mContainElement.clientWidth;
	MyLog(this.mImageElement.clientWidth + ','+this.mContainElement.scrollLeft+","+this.mContainElement.clientWidth);
	//if(Right <= 0.5) Result = Result | 0x01;
	if(Right <= 3) Result = Result | 0x01; //딱맞추어서 0보다 작으면 되지만 브라우져버전벌로 딱 맞추어서 떨어지지 않음.
	if(this.mContainElement.scrollLeft <= 0.5) Result = Result | 0x10;
	//MyLog(Result+'clientWidth'+this.mImageElement.clientWidth+',xx = '+Right);
	return Result;
}

mtlImageView.prototype.setScroll = function(CenterX,CenterY,Interval,Rate)
{
  var bFixWidth = (this.mOptions != null && this.mOptions['FixWidth'] != null) ? this.mOptions['FixWidth'] : true;
  //중간에서 지점 비율의 / 2 (/2 는 좌/우/상/하 가 존재 하기때문 즉 중앙에 클릭했을때를 생각해봐)
  var IntervalX = bFixWidth?Interval * CenterX / (this.mContainElement.clientWidth / 2) / 2:Interval*Rate * CenterX / (this.mContainElement.clientWidth / 2) / 2;
  var IntervalY = bFixWidth?Interval*Rate * CenterY / (this.mContainElement.clientHeight / 2) / 2:Interval * CenterY / (this.mContainElement.clientHeight / 2) / 2;
  this.mContainElement.scrollLeft = this.mContainElement.scrollLeft + IntervalX;
  if(this.mContainElement.scrollLeft < 0) this.mContainElement.scrollLeft = 0;
  this.mContainElement.scrollTop = this.mContainElement.scrollTop + IntervalY;
  if(this.mContainElement.scrollTop < 0) this.mContainElement.scrollTop = 0;
}

//Start Event
mtlImageView.prototype.SetEvent = function()
{
  var clsThis = this;

  //Mouse Down은 PC에서만 사용한다.
  if(this.isIOS() == false && this.isAndroid() == false)
    this.mContainElement.addEventListener("mousedown", function(e){
	 	e = e || window.event;
	  	clsThis.DobleTouch(e.currentTarget,e.x,e.y);
    });

  //Start Touch
  this.mContainElement.addEventListener("touchstart", function(e){
    e = e || window.event;
    if(e.touches.length > 1)
    {
      var imgCon = e.currentTarget;
      imgCon.mCenterX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      imgCon.mCenterY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      var dX = e.touches[0].clientX - e.touches[1].clientX;
      var dY = e.touches[0].clientY - e.touches[1].clientY;
      imgCon.mDif = Math.sqrt(dX * dX + dY * dY);
      e.preventDefault(); //Safari Pinch Zoom 막기.
    }
    else if(e.touches.length == 1)
    {
      clsThis.DobleTouch(e.currentTarget,e.touches[0].clientX,e.touches[0].clientY);
    }
  });

  //Move Touch
  this.mContainElement.addEventListener("touchmove", function(e){
    e = e || window.event;
    if(e.touches.length > 1)
    {
      var bFixWidth = (clsThis.mOptions != null && clsThis.mOptions['FixWidth'] != null) ? clsThis.mOptions['FixWidth'] : true;
      var imgCon = e.currentTarget;
      var dX = e.touches[0].clientX - e.touches[1].clientX;
      var dY = e.touches[0].clientY - e.touches[1].clientY;
      var Dif = Math.sqrt(dX * dX + dY * dY);
      var Interval = (Dif - imgCon.mDif) * 2; //*2는 줌의 반응속도를 높혀준다.
      var Rate = bFixWidth?clsThis.mImageElement.naturalHeight/clsThis.mImageElement.naturalWidth:clsThis.mImageElement.naturalWidth/clsThis.mImageElement.naturalHeight;

      var width = 0;
      var height = 0;
      if(bFixWidth)
      {
        width = imgCon.mWidth + Interval;
        if(width < imgCon.clientWidth) width = imgCon.clientWidth;
        else
        {
          imgCon.mWidth = width;
          imgCon.mDif = Dif;
        }
        height = Rate * width;
      }
      else
      {
        height = imgCon.mHeight + Interval;
        if(height < imgCon.clientHeight) height = imgCon.clientHeight;
        else
        {
          imgCon.mHeight = height;
          imgCon.mDif = Dif;
        }
        width = Rate * height;
      }

      clsThis.mImageElement.style.width = width + 'px';
      clsThis.mImageElement.style.height = height + 'px';

      //크기가 작을때만 가운데로 해야 한다. 이미지가 크게 되면 센터로 위가 짤린다.
      if(height <= imgCon.clientHeight) clsThis.mImageElement.style.margin = 'auto';
      else if(width <= imgCon.clientWidth) clsThis.mImageElement.style.margin = '0 auto';
      else clsThis.mImageElement.style.margin = '';

      clsThis.setScroll(imgCon.mCenterX,imgCon.mCenterY,Interval,Rate,false);
    }

    if(e.touches.length > 1) e.preventDefault(); //Safari Pinch Zoom 막기.
  });


  this.mContainElement.addEventListener("touchend", function(e){
    e = e || window.event;
    //iOS더블터치시 반응이 없다. 엔드에서 무시하면 터치나온다. Start에서 하면 이미지 스크롤이 안된다.
    if (e.cancelable) e.preventDefault();
  });

  this.mContainElement.addEventListener("touchcancel", function(e)
  {
    e = e || window.event;
    if (e.cancelable) e.preventDefault();
  });
}
//End Event



//----------------------------- mtlASwipe -------------------------------------
function mtlASwipe(element)
{
  this.mContainElement = element;
  this.mArrData = [];
  this.mPosition = -1;
  this.mPrevPage = null;
  this.mCurrentPage = null;
  this.mNextPage = null;
  this.mCachPage = [];
  this.mEvent = {};
  this.Init();
}
mtlASwipe.prototype.PushCachPage = function(Page)
{
  this.mCachPage[this.mCachPage.length] = Page;
}
mtlASwipe.prototype.PopCachPage = function()
{
  if(this.mCachPage.length <= 0) return null;
  var Page = this.mCachPage[this.mCachPage.length - 1];
  this.mCachPage.splice(this.mCachPage.length - 1, 1);
  return Page;
}
mtlASwipe.prototype.Init = function()
{
  //this.mContainElement.style.width = '100%';
  //this.mContainElement.style.height = '100%';
  this.mContainElement.style.overflow = 'hidden';
  //this.mContainElement.style.overflow = 'auto';
  this.mContainElement.style.whiteSpace = 'nowrap';
  this.SetEvent();
}

mtlASwipe.prototype.SetContents = function(arrData,position,animation)
{
  var childElms = this.mContainElement.children;
  var childCnt = childElms.length;
  for(var i = childCnt - 1; i >= 0; i--)
  {
    this.PushCachPage(childElms[i]);
    this.mContainElement.removeChild(childElms[i]);
  }


  this.mArrData = arrData;
  this.mPosition = -1;
  this.SetPosition(position,animation);
}

mtlASwipe.prototype.AddData = function(Data)
{
  var CacheSize = 2;
  this.mArrData.push(Data);
  if(this.mPosition == -1)
  {
  	this.SetPosition(0,false);
  }
  else
  {
    var childElms = this.mContainElement.children;
    var childCnt = childElms.length;
    var index = -1;
    for(var i = 0; i < childCnt; i++)
    {
      if(childElms[i].mIndex == this.mPosition)
      {
        index = 0;
      }
	  else if(index != -1) index++;
    }
    var Page;
    var interval = (CacheSize - index);
    if(interval > 0)
    {
    	var Cnt = this.mArrData.length;
        for( i = this.mPosition + index + 1; i < Cnt; i++)
        {
          Page = this.PopCachPage();
          if(Page == null) Page = this.CreatePage();
          this.BindPage(Page,i);
          this.mContainElement.appendChild( Page );
        }

    }
  }
}


mtlASwipe.prototype.GetPosition = function()
{
  return this.mPosition;
}



mtlASwipe.prototype.SetPosition = function(position,animation)
{
  var clsThis = this;
  var CacheSize = 2;

  if(position >= this.mArrData.length) return;
  else if(position < 0) return;
  else if(position == this.mPosition) return;
  if(this.mContainElement.mAnimating) return;


  var Page;
  var beforePosition = this.mPosition;
  if(beforePosition == -1)
  {
     Page = this.PopCachPage();
     if(Page == null) Page = this.CreatePage();
     this.BindPage(Page,position);
     this.mContainElement.appendChild( Page );
     for(var i = 1; i <= CacheSize; i++)
     {
       if(position - i >= 0)
       {
          Page = this.PopCachPage();
          if(Page == null) Page = this.CreatePage();
          this.BindPage(Page,position - i);
          this.mContainElement.insertBefore(Page, this.mContainElement.children[0]);
       }
     }
     for(var i = 1; i <= CacheSize; i++)
     {
       if(position + i < this.mArrData.length)
       {
          Page = this.PopCachPage();
          if(Page == null) Page = this.CreatePage();
          this.BindPage(Page,position + i);
          this.mContainElement.appendChild( Page );
       }
     }
     var toscroll = 0;
     if(position <= CacheSize)
        toscroll = position;
     else {
        toscroll = CacheSize;
      	this.mContainElement.scrollLeft = 0;
     }
     var pos = toscroll * this.mContainElement.clientWidth;
     if(animation)
     {
       	this.mContainElement.mAnimating = true;
        $(this.mContainElement).animate({scrollLeft: pos}, 100, function(){
          clsThis.mContainElement.mAnimating = false;
        });
     }
     else
     {
        this.mContainElement.scrollLeft = pos;
     }

  }
  else //beforePosition == -1
  {
    var dif = position - beforePosition;
    if(dif == 0) {}
    else if(dif > 0 && dif <= CacheSize) //Next
    {
      var nCenter = -1;
      var childElms = this.mContainElement.children;
      var childCnt = childElms.length;
      for(var i = 0; i < childCnt; i++)
      {
        if(childElms[i].mIndex == position)
        {
          nCenter = i;
          break;
        }
      }
      if(nCenter != -1)//센터를 발견했다면
      {
        //다음을 먼저 체크하여 추가한다.
        var index = 1;
        for(var i = nCenter + 1; i <= (nCenter+CacheSize); i++)
        {
          if( i >= childElms.length && position + index < this.mArrData.length)
          {
            Page = this.PopCachPage();
            if(Page == null) Page = this.CreatePage();
            this.BindPage(Page,position + index);
            this.mContainElement.appendChild( Page );
          }
          index++;
        }

        var pos = nCenter * this.mContainElement.clientWidth;
        var CompleateForward = function()
        {
          index = 0;
          childCnt = childElms.length;
          for(var i = 0; i < childCnt; i++)
          {
            if(childElms[i].mIndex == position)
            {
              break;
            }
            index ++;
          }

          var interval = (index - CacheSize);
          for( i = interval - 1; i >= 0; i--)
          {
            clsThis.PushCachPage(childElms[i]);
            clsThis.mContainElement.removeChild(childElms[i]);
          }

          index = 0;
          childCnt = childElms.length;
          for(var i = 0; i < childCnt; i++)
          {
            if(childElms[i].mIndex == position)
            {
              break;
            }
            index ++;
          }
          clsThis.mContainElement.scrollLeft = index * clsThis.mContainElement.clientWidth;
        };
        if(animation)
        {
          this.mContainElement.mAnimating = true;
          $(this.mContainElement).animate({scrollLeft: pos}, 100, function(){
            CompleateForward();
            clsThis.mContainElement.mAnimating = false;
          });
        }
        else
        {
          this.mContainElement.scrollLeft = pos;
          CompleateForward();
        }

      }//nCenter
    }
    else if(dif < 0 && dif >= -CacheSize) //Prev
    {
      var nCenter = -1;
      var childElms = this.mContainElement.children;
      var childCnt = childElms.length;
      var index = 0;
      for(var i = 0; i < childCnt; i++)
      {
        if(childElms[i].mIndex == position)
        {
          nCenter = i;
          break;
        }
        index ++;
      }

      if(nCenter != -1)//센터를 발견했다면
      {
        var interval = (CacheSize - index);
        var count = 0;
        for( i = 1; i <= interval; i++)
        {
            if( position - index - i >= 0)
            {
              Page = this.PopCachPage();
              if(Page == null) Page = this.CreatePage();
              this.BindPage(Page,position - index - i);
              this.mContainElement.insertBefore( Page ,childElms[0]);
              count++;
            }
        }
        if(count > 0)
        {
          //Add 되었기 때문에 스크롤이 움직인다. 그래서 원래의 위치로 다시 옮겨준다.
          childCnt = childElms.length;
          index = 0;
          for(var i = 0; i < childCnt; i++)
          {
            if(childElms[i].mIndex == position)
            {
              nCenter = i;
              break;
            }
            index ++;
          }
          clsThis.mContainElement.scrollLeft = (index + 1) * clsThis.mContainElement.clientWidth;

          var pos = index * this.mContainElement.clientWidth;

          var CompleateBackward = function(){
            var count = 0;
            var delArr = [];
            for(var i = index+1; i < childCnt; i++)
            {
              if(count >= CacheSize)
              {
                delArr.push(childElms[i]);
              }
              count++;
            }
            for(var i = 0; i < delArr.length ; i++)
            {
               clsThis.PushCachPage(delArr[i]);
	           clsThis.mContainElement.removeChild(delArr[i]);
            }
          };

          if(animation)
          {
            this.mContainElement.mAnimating = true;
            $(this.mContainElement).animate({scrollLeft: pos}, 100, function(){
              CompleateBackward();
              clsThis.mContainElement.mAnimating = false;
            });
          }
      	  else
          {
            this.mContainElement.scrollLeft = pos;
            CompleateBackward();
          }


        }
        else
        {
          var pos = position * this.mContainElement.clientWidth;

          var CompleateBackward = function(){
            var count = 0;
            var delArr = [];
            for(var i = index+1; i < childCnt; i++)
            {
              if(count >= CacheSize)
              {
                delArr.push(childElms[i]);
              }
              count++;
            }
            for(var i = 0; i < delArr.length ; i++)
            {
               clsThis.PushCachPage(delArr[i]);
	           clsThis.mContainElement.removeChild(delArr[i]);
            }
          }
          if(animation)
          {
            this.mContainElement.mAnimating = true;
            $(this.mContainElement).animate({scrollLeft: pos}, 100, function(){
              CompleateBackward();
              clsThis.mContainElement.mAnimating = false;
            });
          }
          else
          {
            this.mContainElement.scrollLeft = pos;
            CompleateBackward();
          }

        }

      }//nCenter
    } //else if(dif < 0 && dif >= -CacheSize) //Prev
    else
    {

      var childElms = this.mContainElement.children;
      var childCnt = childElms.length;
      for(var i = childCnt - 1; i >= 0; i--)
      {
        this.PushCachPage(childElms[i]);
        this.mContainElement.removeChild(childElms[i]);
      }


      Page = this.PopCachPage();
      if(Page == null) Page = this.CreatePage();
      this.BindPage(Page,position);
      this.mContainElement.appendChild( Page );


      for(var i = 1; i <= CacheSize; i++)
      {
        if(position - i >= 0)
        {
          Page = this.PopCachPage();
          if(Page == null) Page = this.CreatePage();
          this.BindPage(Page,position - i);
          this.mContainElement.insertBefore(Page, this.mContainElement.children[0]);
        }
      }


      for(var i = 1; i <= CacheSize; i++)
      {
        if(position + i < this.mArrData.length)
        {
          Page = this.PopCachPage();
          if(Page == null) Page = this.CreatePage();
          this.BindPage(Page,position + i);
          this.mContainElement.appendChild( Page );
        }
      }

      var toscroll = 0;
      if(position <= CacheSize)
        toscroll = position;
      else {
        toscroll = CacheSize;
      	this.mContainElement.scrollLeft = 0;
      }
      var pos = toscroll * this.mContainElement.clientWidth;

      if(animation)
      {
        this.mContainElement.mAnimating = true;
        $(this.mContainElement).animate({scrollLeft: pos}, 100, function(){
          clsThis.mContainElement.mAnimating = false;
        });
      }
      else
      {
        this.mContainElement.scrollLeft = pos;
      }
     }

  } ////beforePosition == -1
  if(this.mEvent['onChange']) this.mEvent['onChange'](this.mContainElement,position);
  this.mPosition = position;
}

mtlASwipe.prototype.CreatePage = function()
{
//  var element = document.createElement( 'div' );
//  element.style.display = 'inline-block';
//  element.style.position = 'relative';
//  element.style.width = '100%';
//  element.style.height = '100%';
//  return element;
  return null;
}

mtlASwipe.prototype.BindPage = function(element,index)
{
  element.mIndex = index;
  //$(element).ImgView('load',{url:this.mArrData[index]});
}

mtlASwipe.prototype.isIOS = function(){
	   var isIOS = (/iPad|iPhone|iPod/.test(navigator.platform) ||
	(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
	!window.MSStream;
	   return isIOS;
	};
mtlASwipe.prototype.isAndroid = function() {
  return /Android/i.test(navigator.userAgent);
}

mtlASwipe.prototype.SetEvent = function()
{
  var clsThis = this;
  if(this.isIOS() == false && this.isAndroid() == false)
  {
    this.mContainElement.addEventListener("mousedown", function(e) {
      var conElement = clsThis.mContainElement;
      e = e || window.event;
      conElement.mX = e.x;
      conElement.mbeforeScrollLeft = conElement.scrollLeft;
	});

    this.mContainElement.addEventListener("mousemove", function(e){
      var conElement = clsThis.mContainElement;
      if(conElement.mX != null)
      {
        e = e || window.event;
        var Dir = conElement.mX - e.x;
        var nowIndex = Math.round(conElement.scrollLeft / conElement.clientWidth);
        //conElement.scroll(conElement.mbeforeScrollLeft + Dir,0); (오래된 안드로이드 크롬에서는 함수를 찾을 수 없다.)
        conElement.scrollLeft = conElement.mbeforeScrollLeft + Dir;
      }
    });

    this.mContainElement.addEventListener("mouseup", function(e){
      var conElement = clsThis.mContainElement;
      if(conElement.mX != null)
      {
        e = e || window.event;
        clsThis.EndMouse(conElement,e.x);
      }
    });

    this.mContainElement.addEventListener("mouseout", function(e){
      var conElement = clsThis.mContainElement;
      if(conElement.mX != null)
      {
        e = e || window.event;
        clsThis.EndMouse(conElement,e.x);
      }
    });
  }

  this.mContainElement.addEventListener("touchstart", function(e){
    var conElement = clsThis.mContainElement;
    e = e || window.event;

    conElement.mStartIndex = Math.round(conElement.scrollLeft / conElement.clientWidth);
    conElement.mX = e.touches[0].clientX;
    conElement.mbeforeScrollLeft = conElement.scrollLeft;

    //onthouchend 에 touches = 0 이다..
    conElement.mMobileBeforeX = conElement.mX;
    conElement.mMobileBeforeDir = 0;
  });

  this.mContainElement.addEventListener("touchmove", function(e){
    var conElement = clsThis.mContainElement;
    if(conElement.mX != null)
    {
    	
      //0x10 왼쪽, 0x01 오른쪽
      var canSwapeState = $(conElement.children[conElement.mStartIndex]).ImgView('canSWape');
      e = e || window.event;

      if(e.touches.length > 1) return; //Added By Song 2020.09.04 핀치줌일때 스크롤되지 않게 막음.

      var Dir = conElement.mX - e.touches[0].clientX;
      MyLog("Touchmove " + canSwapeState);
      //0x10 왼쪽은 왼쪽 방향만 허용, 0x01 오른쪽 오른쪽 방향만 허용
      if(((canSwapeState & 0x10) && Dir < 0) || ((canSwapeState & 0x01) && Dir > 0))
      {
		//onthouchend 에 touches = 0 이다..
        conElement.mMobileBeforeX = e.touches[0].clientX;
        conElement.mMobileBeforeDir = Dir;

        //conElement.scroll(conElement.mbeforeScrollLeft + Dir,0); (오래된 안드로이드 크롬에서는 함수를 찾을 수 없다.)
        conElement.scrollLeft = conElement.mbeforeScrollLeft + Dir;
      }
      else
        conElement.mX = e.touches[0].clientX;
    }
  });


  this.mContainElement.addEventListener("touchend", function(e){
    var conElement = clsThis.mContainElement;
    e = e || window.event;
    //onthouchend 에 touches = 0 이다..
    clsThis.EndMouse(conElement,conElement.mMobileBeforeX-conElement.mMobileBeforeDir);
  });

  this.mContainElement.addEventListener("touchcancel", function(e){
    var conElement = clsThis.mContainElement;
    e = e || window.event;
    //onthouchend 에 touches = 0 이다..
    clsThis.EndMouse(conElement,conElement.mMobileBeforeX-conElement.mMobileBeforeDir);
  });


}

mtlASwipe.prototype.GetSwipeSelectedPageIndex = function(conElement)
{
  return Math.round(conElement.scrollLeft / conElement.clientWidth);
}

/*마우스 종료 되었을 경우 스크롤을 정리 해준다.*/
mtlASwipe.prototype.EndMouse = function(conElement,x)
{
  var Dir = conElement.mX - x;
  var nowIndex = this.GetSwipeSelectedPageIndex(conElement);
  var point = conElement.scrollLeft / conElement.clientWidth;
  var ceilPoint = Math.floor(conElement.scrollLeft / conElement.clientWidth);
  difPoint = point - ceilPoint;
  if(difPoint >= 0.8) //원래데로 복원 (Left)
  {
    this.setAnimationSwipe(conElement,conElement.clientWidth * nowIndex);
  }
  else if(difPoint > 0.5)
  {
    if(Dir <= 0)
        this.setAnimationSwipe(conElement,conElement.clientWidth * (nowIndex - 1));
    else
    	this.setAnimationSwipe(conElement,conElement.clientWidth * nowIndex);
  }
  else if(difPoint <= 0.2) //원래데로 복원 (right)
  {
    this.setAnimationSwipe(conElement,conElement.clientWidth * nowIndex);
  }
  else if(difPoint <= 0.5)
  {
    if(Dir >= 0)
      this.setAnimationSwipe(conElement,conElement.clientWidth * (nowIndex + 1));
    else
      this.setAnimationSwipe(conElement,conElement.clientWidth * nowIndex);
  }
  conElement.mX = null;
  conElement.mbeforeScrollLeft = null;
}

/*스크롤을 애니메이션 해준다.*/
mtlASwipe.prototype.setAnimationSwipe = function(elementContain,scrollPos)
{
   var clsThis = this;
   $(elementContain).animate({scrollLeft: scrollPos}, 100,
          function(){
             //애니메이션 종료시..
             var index = clsThis.GetSwipeSelectedPageIndex(elementContain);
             clsThis.SetPosition(elementContain.children[index].mIndex,false);
          });
}


/*마우스다운*/
mtlASwipe.prototype.OnMouseDown = function(conElement,e)
{
  e = e || window.event;
  conElement.mX = e.x;
  conElement.mbeforeScrollLeft = conElement.scrollLeft;
}


function mtlGalleryView(element)
{
	this.mFixWidth = true;
	mtlASwipe.call(this,element); // 상위 생성자를 불러준다.
}


mtlGalleryView.prototype = Object.create(mtlASwipe.prototype);
mtlGalleryView.prototype.constructor = mtlGalleryView;
mtlGalleryView.prototype.BindPage = function(element,index)
{
  mtlASwipe.prototype.BindPage.call(this,element,index);
  $(element).ImgView('load',{url:this.mArrData[index],fixwidth:this.mFixWidth});
}

mtlGalleryView.prototype.SetFixWidth = function(bFixWidth)
{
	this.mFixWidth = bFixWidth;
	var childElms = this.mContainElement.children;
	var childCnt = childElms.length;
	for(var i = 0; i < childCnt; i++)
	{
		childElms[i].mObjectView.SetFixWidth(bFixWidth);
	}
}

mtlGalleryView.prototype.GetFixWidth = function()
{
	return this.mFixWidth;
}

mtlGalleryView.prototype.CreatePage = function()
{
  //mtlASwipe.prototype.CreatePage.call(this);
  var element = document.createElement( 'div' );
  element.style.display = 'inline-block'; //가로로 해준다.
  element.style.position = 'relative';
  element.style.width = '100%';
  element.style.height = '100%';
  return element;
}

//<div class='mtlImageView' src='img/test2.png' fixwidth=true>
//load = {fixwidth:false,url:'img/test2.png'}
//setfixwidth = true or false
//getfixwidth = return true or false
jQuery.prototype.ImgView = function(cmd,params) {
  if(this[0] == null) {return;}

  var ObjectView  = null;
  if(cmd == 'class') {
    var bFixwidth = true;
    for(var i = 0; i < this.length;i++)
    {
        ObjectView = this[i].mObjectView;
         if(ObjectView == null) {
            ObjectView = new mtlImageView(this[i],params);
            this[i].mObjectView = ObjectView;
            if($(this[i]).attr("fixwidth")) bFixwidth = $(this[i]).attr("fixwidth") == "true"? true : false;
            ObjectView.SetFixWidth(bFixwidth);
            ObjectView.LoadImage($(this[i]).attr("src"));
        }
    }
    return ;
  }

  ObjectView = this[0].mObjectView;
  if(ObjectView == null) {
    ObjectView = new mtlImageView(this[0],params);
    this[0].mObjectView = ObjectView;
  }

  if(cmd == 'load') {
      if(params['size'] != null) ObjectView.mSize = params['size'];
      ObjectView.LoadImage(params['url']);
	  if(params['fixwidth'] != null) ObjectView.SetFixWidth(params['fixwidth']);
  }
  else if(cmd == 'setFixWidth') ObjectView.SetFixWidth(params);
  else if(cmd == 'getFixWidth') return ObjectView.GetFixWidth();
  else if(cmd == 'resize') { ObjectView.mSize = params;ObjectView.ResetAlign(params.width,params.height);}
  else if(cmd == 'canSWape') return ObjectView.canSWape();
  else if(cmd == 'isLoaded') return ObjectView.mIsLoaded;
  else if(cmd == 'clear') return ObjectView.LoadImage('');
  else
  {
  }
}

//HTML : <div class='mtlGalleryView' contents="['http://1','http://2','http://3',]" position='1'/>
//setContents : {contents:arrdata,position:0,animation:true}
//setPosition : {position:0,animation:true}
//addData : data
//event : {onchange:function(pos){}}
//getCount : size
//getAt(index) : return
jQuery.prototype.GalleryView = function(cmd,params) {
	if(this[0] == null) return;

	var ObjectView = null;
	if(cmd == 'class') {
	    for(var i = 0; i < this.length; i++)
	    {
	        ObjectView = this[i].mObjectView;
	        if(ObjectView == null) {
	            ObjectView = new mtlGalleryView(this[i],params);
	            this[i].mObjectView = ObjectView;

	            var contents = [];
		        var position = 0;
		    if($(this[i]).attr('contents')) {
			    var sCon = $(this[i]).attr('contents').replace(/'/gi,"\"");
			    contents = JSON.parse(sCon);
		    }
		    if($(this[i]).attr('position')) position = Number($(this[i]).attr('position'));
		    var bFixwidth = true;
		    if($(this[i]).attr("fixwidth")) bFixwidth = $(this[i]).attr("fixwidth") == "true"?true:false;
	        ObjectView.SetFixWidth(bFixwidth);
		    ObjectView.SetContents(contents,position,false);
	        }
	        }

	        return;

	}

	ObjectView = this[0].mObjectView;
	if(ObjectView == null) {
	 ObjectView = new mtlGalleryView(this[0],params);
	 this[0].mObjectView = ObjectView;
	}
	if(cmd == 'setContents') ObjectView.SetContents(params['contents'],params['position']?params['position']:0,params['animation']?params['animation']:false);
	else if(cmd == 'setPosition') ObjectView.SetPosition(params['position']?params['position']:0,params['animation']?params['animation']:false);
	else if(cmd == 'getPosition') return ObjectView.GetPosition();
	else if(cmd == 'addData') ObjectView.AddData(params);
	else if(cmd == 'setEvent') ObjectView.mEvent = params;
	else if(cmd == 'setFixWidth') ObjectView.SetFixWidth(params);
	else if(cmd == 'getFixWidth') return ObjectView.GetFixWidth();
	else if(cmd == 'getCount') return ObjectView.mArrData.length;
	else if(cmd == 'getAt') return ObjectView.mArrData[params];
	else
	{
	}
}

$(function(){
	$("[class=mtlImageView]").ImgView('class');
	$("[class=mtlGalleryView]").GalleryView('class');
});

