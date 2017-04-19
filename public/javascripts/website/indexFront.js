$(function() { 
     $("#logo2").delay(300).animate({opacity: '1'},1000);
     $("#logo2").animate({top: '30'},500);
     $("#audio")[0].play();
     var x = 1;
     $("#volumeDown").on("click",function (){ 
        if ($("#audio").prop("volume")>=0.1) {
            $("#audio").prop("volume", x);
            x-=0.1;
        }
     }); 
     $("#volumeUp").on("click",function (){ 
        if ($("#audio").prop("volume")<=0.9) {
            x+=0.1;
            $("#audio").prop("volume", x); 
        }
     }); 
     $("#volumeOff").on("click",function (){ 
         x=0;
      $("#audio").prop("volume",x) ;  
     });     
});