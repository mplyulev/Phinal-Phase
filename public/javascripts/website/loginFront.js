$(function() {
    $('#backendLoginMessage').delay(5000).fadeOut(1000);
    $("#audio")[0].play();
    $('#login').delay(1000).fadeIn(1500);
    $("#register").on("click", function (event) { 
          event.preventDefault();
        $('#login').fadeOut(1000);
      setTimeout(function ()  {
             window.location.href = "http://localhost:5000/registration";
        },2000);
     $("#registrationWrapper").delay(1700).fadeIn(1500);    
    });  
    $("#loginLink").on('click', function(event) {
        event.preventDefault();
        $('#registrationWrapper').fadeOut(1500);
        $("#backendLoginMessage").fadeOut(1000);
        $("#name,#password,#passwordConfirm,#email").val('');
        $("#nameValidation").fadeOut(1000);
        $("#emailValidation").fadeOut(1000);
        $("#passwordValidation").fadeOut(1000);
        $("#passwordConfirmValidation").fadeOut(1000);
        $('#login').delay(1500).fadeIn(1500);
        setTimeout(function() {
       window.location.href = "http://localhost:5000/login";
        },2000 );
    });

    
    var nameRegexp = /^[a-zA-Z ]+$/;
    var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    function clearFieldHideValidationMessage (element,message) { 
        $("#messageEmailTaken").fadeOut(1000);
        $("#messageUsernameTaken").fadeOut(1000); 
        $("#"+ element).on("focus", function () {
        // $("#"+ element).val("");
        $("#"+ message).fadeOut(1000);
    });
    }

    function nameValidationFunc ()  {
        var nameInput = $("#name").val();
        if (!nameRegexp.test(nameInput) && nameInput.length!=0) {
            $("#nameValidation").fadeIn(1000); 
        }
    }

    function emailValidationFunc ()  {
        var emailValue = $("#email").val();
        if (!emailRegexp.test(emailValue) && emailValue.length!=0) {
            $("#emailValidation").fadeIn(1000);
        }
    }

    function passwordValidationFunc () {
        var passwordValue = $("#password").val();
        if (passwordValue.length<6 && passwordValue.length!=0) {
            $("#passwordValidation").fadeIn(1000);
        }
    }
    
    function passwordConfirmValidationFunc ()  {
        var passwordValue = $("#password").val();
        var passwordConfirmValue = $("#passwordConfirm").val();
        if (passwordConfirmValue!==passwordValue) {
            $("#passwordConfirmValidation").fadeIn(1000);
    }
    }


    $("#name").on("blur", nameValidationFunc);
    $("#name").on("focus", function () {
        clearFieldHideValidationMessage("name","nameValidation");
             
    });
     
    $("#email").on("blur",emailValidationFunc);
    $("#email").on("focus", function () {
       clearFieldHideValidationMessage("email","emailValidation");
    });


    $("#password").on("blur",passwordValidationFunc);
    $("#password").on("focus",function(){ 
        clearFieldHideValidationMessage("password","passwordValidation");
    });


    $("#passwordConfirm").on("blur", passwordConfirmValidationFunc);
    $("#passwordConfirm").on("focus", function () {
         clearFieldHideValidationMessage("passwordConfirm","passwordConfirmValidation")
    });
    

    $("#registerButton").on('click', function (event) {
        var nameInput = $("#name").val();
        var passwordValue = $("#password").val();
        var passwordConfirmValue = $("#passwordConfirm").val();
        var emailValue = $("#email").val();
        if ($("#username").val().length==0) {
            event.preventDefault();
            $("#usernameValidation").fadeIn(1000);
        }
        if (!nameRegexp.test(nameInput) && nameInput.length!=0) {
            event.preventDefault();
        }
        if (!emailRegexp.test(emailValue) && emailValue.length!=0) {
            event.preventDefault();
         }
        if (passwordValue.length<6 && passwordValue.length!=0) {
            event.preventDefault();
          }
        if (passwordValue.length==0) {
            event.preventDefault();
          }
        if (passwordConfirmValue!==passwordValue) {
            event.preventDefault(); 
          }
    });


    $("#username").on("focus", function() {
        $("#username").val("");
        $("#usernameValidation").fadeOut(1000);
    });

 
// login form 

$("#usernameLogin,#key").on('focus',function (){
    $('#backendLoginMessage').fadeOut(1000);
})
});

 
 
 





