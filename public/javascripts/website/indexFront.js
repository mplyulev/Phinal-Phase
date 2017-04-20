$(function() { 
     $("#logo2").delay(4000).animate({opacity: '1'},1000);
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
    $("#svgText").delay(4000).fadeOut(1000);
    $("#navbarUl").on( "mouseover", "a", function() {
  $("#audioMenu")[0].play();
});
    $("#navbarUl").on( "click", "a", function() {
  $("#audioClick")[0].play();
});
 
});