var app  = angular.module("myApp",["ngRoute"]);
 app.config(function ($routeProvider) {
     $routeProvider
     .when("/changePassword", {
         templateUrl: "/HTML/changePassword.htm",
     }) 
     .when("/ranklist", {
         templateUrl: "/HTML/ranklist.htm",
     }) 
     .when("/myStatistics", {
         templateUrl: "/HTML/myStatistics.htm",
     }) 
     .when("/contacts", {
         templateUrl: "/HTML/contacts.html",
     }) 
     .when("/messages", {
         templateUrl: "/HTML/messages.htm",
     }) 
     .when("pp", {
         templateUrl: "/HTML/phinalphase.html",
     }) 
 });

app.controller("avatarController",  function($scope,$http)  {
$http.get("data").then(function (response)  {
$scope.data = response.data;
});
 });

app.controller("ranklistController",  function($scope,$http)  {
$http.get("dataRanklist").then(function (response)  {
$scope.data = response.data;
});
var roundedOne = angular.element( document.querySelector('#roundedOne'));
var ranklistContainer = angular.element( document.querySelector( '#ranklistContainer' ) );
var ranklistMenuButton = angular.element( document.querySelector( '#ranklistMenuButton' ) );
$(roundedOne).on("click", function () {
    $(ranklistContainer).delay(1000).fadeOut(1000);
});
 $(ranklistMenuButton).on("click", function () {
    // $(ranklistContainer).fadeIn(1000); 
});
$("#ranklistTable").on("click",".ranklistUsername", function (event) {
    $("#messageTo").text("Send a message to " + event.target.textContent) 
    $("#usermessageContactForm").delay(1000).fadeIn(1000);
    $("#toggledRanklistContainer").fadeOut(1000);
    $("#hiddenInputHelper").val(event.target.textContent.substr(1));
    $("#hiddenInputHelper").css("display","none");
});
    $("#messageToUserSubmit").on("click", function() {
        $("#successMessageToUser").fadeIn(1000);
        $("#usermessageContactForm").delay(3000).fadeOut(1000);
        $("#toggledRanklistContainer").delay(4000).fadeIn(1000);
        console.log("asdasd");
    });
 });



app.controller("nameSortController",  function($scope)  {
    $scope.filterString = '';
    $scope.sortByName = false;
    $scope.sortOrder = '';
    $scope.setSortOrder = function()
    {
        if($scope.sortByName)
        {
            $scope.sortOrder = 'username';   
        }
        else
        {
            $scope.sortOrder = '';
        }
    }
 });
 
app.controller('messageController', function($scope) {
    var messageArea = angular.element( document.querySelector( '#messageMail' ) );
    var subject = angular.element( document.querySelector( '#subject' ) );
    var sendButton = angular.element( document.querySelector( '#messageSubmit' ) );
    var successMessage = angular.element( document.querySelector( '#success' ) );
    var noSuccessMessage = angular.element( document.querySelector( '#noSuccess' ) );
    var noSuccessMessage2 = angular.element( document.querySelector( '#noSuccess2' ) );
    var form = angular.element( document.querySelector( '#messageForm' ) );
    $(sendButton).on('click', function(event) {
        function preventDefault(e) {
            e.preventDefault();
        }
    //   $(form).bind("submit", preventDefault);    
        if (messageArea.val().length > 1 && subject.val().length>0) { 
            $(successMessage).fadeIn(1000).delay(2500).fadeOut(1000);
            $(successMessage).css("display","block");   
        }
        if (messageArea.val().length<1)  {
            $(noSuccessMessage2).toggle();
            $(noSuccessMessage).show(1000).delay(2500).fadeOut(1000);
        }
        if (subject.val().length<1)  {
            $(noSuccessMessage2).toggle();
            $(noSuccessMessage2).show(1000).delay(2500).fadeOut(1000);
        }
    });  
});

app.controller('usernameSortController', function($scope,$http) {
    $http.get("dataRanklist").then(function (response)  {
    $scope.data = response.data;
    $scope.orderByField = 'username';
    $scope.reverseSort = false;
});
});

 

 