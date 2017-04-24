var app  = angular.module("myApp",["ngRoute"]);
 app.config(function ($routeProvider) {
     $routeProvider
     .when("/changePassword", {
         templateUrl: "/HTML/changePassword.htm",
     }) 
     .when("pp", {
         templateUrl: "/HTML/phinalphase.html",
     }) 
 });

 app.controller("avatarController",  function($scope,$http)  {
$http.get("data").then(function (response)  {
$scope.data = response.data;
console.log("check controller");

});
 });

//  app.controller("logoutController", function ($scope) {
//      $scope.neshto = "mrirririririri";
//  })