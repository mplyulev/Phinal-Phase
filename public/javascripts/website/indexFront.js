$(function() { 
     $("#logo2").delay(4000).animate({opacity: '1'},1000);
     $("#logo2").animate({top: '30'},500);
     $("#audio")[0].play();
     var x = 1;
     $("#volumeDown").on("click",function (){ 
        if ($("#audio").prop("volume")>=0.1) {
            $("#audio").prop("volume", x);
            $("#audioClick").prop("volume",x);
            $("#audioMenu").prop("volume",x);
            x-=0.1;
        }
     }); 
     
     $("#volumeUp").on("click",function (){ 
        if ($("#audio").prop("volume")<=0.9) {
            x+=0.1;
            $("#audio").prop("volume", x);
            $("#audioClick").prop("volume",x);
            $("#audioMenu").prop("volume",x); 
        }
     }); 
     $("#volumeOff").on("click",function (){ 
        x=0;
        $("#audio").prop("volume",x) ;  
          $("#audioClick").prop("volume",x);
            $("#audioMenu").prop("volume",x); 
        
     });   
    $("#svgText").delay(4000).fadeOut(1000);
     $("#audioMenu").prop("volume",0.3);
     $("#audioClick").prop("volume",0.3);
    $("#navbarUl").on( "mouseover", "a", function() {
  $("#audioMenu")[0].play();
  
});
    $("#navbarUl").on( "click", "a", function() {
    $("#audioClick")[0].play();
});
        $("#radio").prop("volume",0.2);
     $("#radio")[0].play();
});