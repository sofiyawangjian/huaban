$(function(){
	var $divs=$('.left>div');
	var $box=$('.box');
	var canvas=null;
	var copy=null;
	var w;
	var h;
	/*var w=500;
	var h=500;*/
	/*var w=600;
	var h=600;*/

	$('.new').click(function(){
		var w=prompt('请输入宽',500);
		var h=prompt('请输入高',500);
		$('canvas').remove();
		$('.copy').remove();
		$box.css({width:'auto',height:'auto'});
		canvas=$('<canvas>').attr({width:w,height:h});
					$box.css({width:w,height:h});
					copy=$('<div>').addClass('copy').css({width:w,height:h,position:'absolute',left:0,top:0,
						zIndex:999});
					console.log(copy[0]);
					$box.append(canvas).append(copy);
					pale();})
		
   function pale(){
	  var pale=new palette(canvas[0].getContext('2d'),canvas[0],copy[0]);
	  pale.draw();
	  $('.chexiao').click(function(){
	  	if(pale.status.length>1){
	  		pale.status.pop();
	  		pale.o.putImageData(pale.status[pale.status.length-1],0,0,0,0,pale.w,pale.h) 
	  	}else if(pale.status.length==1){
	  		pale.status.pop();
	  		pale.o.clearRect(0,0,pale.w,pale.h);
	  	}else{
	  		alert(1);
	  	}
	  });
	   $('.line').click(function(){
	   		var attr=$(this).attr('role');
	   		 pale.type=attr;
	   })
	    $('.rect').click(function(){
	   		var attr=$(this).attr('role');
	   		 pale.type=attr;
	   })
	     $('.circle').click(function(){
	   		var attr=$(this).attr('role');
	   		 pale.type=attr;
	   		
	   })
	      $('.triggle').click(function(){
	   		var attr=$(this).attr('role');
	   		 pale.type=attr;
	   		
	   })
	    $('.poly').click(function(){
	    	var bian=prompt('请输入边数',5)||5;
			pale.pnum=bian;
	   		var attr=$(this).attr('role');
	   		 pale.type=attr;
	   		 
	   })
	    $('.polyStar').click(function(){
	   		var attr=$(this).attr('role');
	   		var bian=prompt('请输入角的个数',5)||5
			pale.pang=bian;
	   		 pale.type=attr;
	   		
	   })
	    $('.pencil').click(function(){
	   		pale.pencil();
	   })
	    $('.earser').click(function(){
	   		pale.earser();
	   })
	    $('.fill').click(function(){
	   		var attr=$(this).attr('role');
	   		 pale.style=attr;
	   })
	    $('.stroke').click(function(){
	   		var attr=$(this).attr('role');
	   		 pale.style=attr;
	   })
	    $('.strokeStyle').click(function(){
	   		$(this).find('input').change(function(){
	   			pale.strokeStyle=this.value;
	   		});
	   })
	    $('.fillStyle').click(function(){
	   		$(this).find('input').change(function(){
	   			pale.fillStyle=this.value;
	   		});
	   })
	    $('.lineWidth').click(function(){
	   		$(this).find('input').change(function(){
	   			pale.lineWidth=this.value;
	   		});
	   })
       $(".save").click(function(){

       	    pale.save()
       })
       $(".shanbtn").click(function(){
       	   pale.shanchu()
       })
	  /*$divs.click(function(){
	  	    var attr=$(this).attr('role');
			if(attr!=undefined){
				if(attr=='line'){
				    pale.type=attr;
				}else if(attr=='rect'){
					pale.type=attr;
				}else if(attr=='circle'){
					pale.type=attr;
				}else if(attr=='triggle'){
					pale.type=attr;
				}else if(attr=='poly'){
					var bian=prompt('请输入边数',5)||5;
					pale.pnum=bian;
					pale.type=attr;
				}else if(attr=='polyStar'){
					var bian=prompt('请输入角的个数',5)||5
					pale.pang=bian;
					pale.type=attr;
				}else if(attr=='fill'||attr=='stroke'){
					pale.style=attr;
				}else if(attr=='fillStyle'){
					$(this).find('input').change(function(){
						pale.fillStyle=this.value;
					});
					
				}else if(attr=='strokeStyle'){
					$(this).find('input').change(function(){
						pale.strokeStyle=this.value;
					});
				}else if(attr=='pencil'){
		            pale.pencil();
		            return;
				}else if(attr=='earser'){
					pale.earser();
					return;
				}
				pale.draw();
			}
			
	});	*/
	 }
			
	
	
	
})
