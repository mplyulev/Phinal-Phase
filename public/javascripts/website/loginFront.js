$(function() {
    $('#login').delay(1000).fadeIn(1500);
$("#register").on("click", function (event) { 
     $('#login').fadeOut(1000);
    event.preventDefault();
    $("#registrationWrapper").delay(1700).fadeIn(1500);    
});  
$("#loginLink").on('click', function(event) {
    event.preventDefault();
    $('#registrationWrapper').fadeOut(1500);
    $('#login').delay(1500).fadeIn(1500);
});
var nameRegexp = /^[a-zA-Z ]+$/;
 $("#name").on("blur", function () {
  var nameInput = $("#name").val();
    if (!nameRegexp.test(nameInput) && nameInput.length!=0) {
        $("#nameValidation").fadeIn(1000);
    }
 });

 $("#name").on("focus", function () {
     $("#name").val("");
     $("#nameValidation").fadeOut(1000);
 });
 
var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 $("#email").on("blur", function (){ 
      var emailValue = $("#email").val();
     if (!emailRegexp.test(emailValue) && emailValue.length!=0) {
         $("#emailValidation").fadeIn(1000);
     }
 })
 $("#email").on("focus", function () {
     $("#email").val("");
     $("#emailValidation").fadeOut(1000);
 });


 
 $("#password").on("blur",function(){ 
    var passwordValue = $("#password").val();
     if (passwordValue.length<6 && passwordValue.length!=0) {
         $("#passwordValidation").fadeIn(1000);
     }
      });
 $("#password").on("focus",function(){ 
         $("#passwordValidation").fadeOut(1000);
 });

$("#passwordConfirm").on("blur", function () {
    var passwordValue = $("#password").val();
    var passwordConfirmValue = $("#passwordConfirm").val();
    if (passwordConfirmValue!==passwordValue) {
        $("#passwordConfirmValidation").fadeIn(1000);
    }
    $("#passwordConfirm").on("focus", function () {
        $("#passwordConfirmValidation").fadeOut(1000);
        $("#passwordConfirm").val("");
    });
})

$("#registerButton").on('click', function (event) {
    if ($("#username").val().length==0) {
        event.preventDefault();
    $("#usernameValidation").fadeIn(1000);
}
});


$("#username").on("focus", function() {
    $("#username").val("");
    $("#usernameValidation").fadeOut(1000);
})

 

});
 
 
 





