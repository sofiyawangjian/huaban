/*
绘制对象cobj
canvas 标签
*/
function palette(cobj,canvas,copy){
	this.copy=copy;
	this.o=cobj;
	this.canvas=canvas;
	this.w=canvas.width;
	this.h=canvas.height;
	this.style='stroke';
	this.type='line';
	this.fillStyle='#000';
	this.strokeStyle='#000';
	this.lineWidth=1;
	this.pnum=5;
	this.pang=5;
	this.status=[];
}
//初始化
palette.prototype.init=function(){
	this.o.fillStyle=this.fillStyle;
	this.o.strokeStyle=this.strokeStyle;
	this.o.lineWidth=this.lineWidth;
}
palette.prototype.draw=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.init();
		/*alert(1)*/
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.w,that.h);
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.w,that.h) 
			}
			var mx=e.offsetX;
			var my=e.offsetY;
			that[that.type](dx,dy,mx,my);
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.w,that.h));
		
			document.onmousemove=null;
			document.onmouseup=null;
			
		}
	}
}
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.moveTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
	
}
palette.prototype.rect=function(x1,y1,x2,y2){
	var w=x2-x1;
	var h=y2-y1;
	this.o.beginPath();
	this.o.rect(x1-0.5,y1-0.5,w,h);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.circle=function(x1,y1,x2,y2){
    this.o.beginPath();
    this.o.arc(x1,y1,this._r(x1,y1,x2,y2),0,Math.PI*2);
    this.o.closePath();
    this.o[this.style]();
}
palette.prototype._r=function(x1,y1,x2,y2){	
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
palette.prototype.triggle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x1,y2);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		that.init();
		that.o.beginPath();
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.w,that.h);
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.w,that.h) 
			}
			var dx=e.offsetX;
			var dy=e.offsetY;
			that.o.lineTo(dx,dy);
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.o.closePath();
			that.status.push(that.o.getImageData(0,0,that.w,that.h));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
palette.prototype.poly=function(x1,y1,x2,y2){
  var r=this._r(x1,y1,x2,y2);
  var ang=360/this.pnum;
  var n=this.pnum;
  this.o.beginPath();
  for(var i=0;i<=n;i++){
  	this.o.lineTo(x1+Math.cos(ang*i*Math.PI/180)*r,y1+Math.sin(ang*i*Math.PI/180)*r);
  	
  }
  this.o[this.style]();
  this.o.closePath();


}
palette.prototype.polyStar=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var r1=r/3;
	var ang=360/this.pang/2;
  var n=this.pang*2;
  this.o.beginPath();
  for(var i=0;i<=n;i++){
  	if(i%2==0){
  		this.o.lineTo(x1+Math.cos(ang*i*Math.PI/180)*r,y1+Math.sin(ang*i*Math.PI/180)*r);	
  	}else{
  		this.o.lineTo(x1+Math.cos(ang*i*Math.PI/180)*r1,y1+Math.sin(ang*i*Math.PI/180)*r1);	
  	}
  	
  	
  }
  this.o[this.style]();
  this.o.closePath();
}
/*b=Math.sin(ang*i*Math.PT/180)*r;
b=sin()*c;
a=cos()*c;*/
palette.prototype.earser=function(){
  var that=this;
  var a=document.createElement('div');
  /*var box=document.querySelector('.box');*/
  if(that.status.length>0){
	that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.w,that.h) 
  }
  this.copy.onmousedown=function(e){
  	var w=30;
    a.style.cssText="width:"+w+"px;height:"+w+"px;position:absolute;border:2px solid red;"
  	 document.onmousemove=function(e){
  	 	/*that.o.clearRect(0,0,that.w,that.h);*/
  	 	e.preventDefault();
        
  	 	var mx=e.offsetX;
  	 	var my=e.offsetY;
        a.style.left=mx-w/2+'px';
        a.style.top=my-w/2+'px';
        that.copy.parentNode.appendChild(a);
  	 	that.o.clearRect(mx-w/2,my-w/2,w,w);
  	 	
  	 }
  	 document.onmouseup=function(){
  	 	that.status.push(that.o.getImageData(0,0,that.w,that.h));
  	 	document.onmousemove=null;
  	 	document.onmouseup=null;
  	 	that.copy.parentNode.removeChild(a);
  	 	a=null;
  	 	that.draw();
  	 }
  }
}
var putStorage = function(key,value){
	window.localStorage.setItem(key,value);
}
var getStorage = function(key){
	return window.localStorage.getItem(key);
}

palette.prototype.save=function(){
		var dataUrl = getStorage(0);
		if(dataUrl == null || dataUrl == ''){
			putStorage(0,this.canvas.toDataURL());
			$("#history_1").attr("src",this.canvas.toDataURL());
			initHistorty();
			return ;
			
		}else{}
	}			
palette.prototype.shanchu=function(){
	  window.localStorage.clear();
	  $("#history_1").attr("src","")
}



var initHistorty = function(){
		var dataUrl = getStorage(0);
		if(dataUrl!=null&&dataUrl!=''){
			//图片
			$("#history_1").attr("src",dataUrl);
			//下载链接
			$("#history_download_1").attr("href",dataUrl);
			//删除链接
			$("#history_del_1").attr("href","javascript:void(0)");
		}else{
			//图片
			$("#history_1").attr("src",'/images/draw/noimg.png');
			//下载链接
			$("#history_download_1")[0].removeAttribute('href');  
			//删除链接
			$("#history_del_1")[0].removeAttribute('href');  
			
		}
	}
