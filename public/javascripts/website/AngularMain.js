var app  = angular.module("myApp",["ngRoute"]);
 app.config(function ($routeProvider) {
     $routeProvider
     .when("/changePassword", {
         templateUrl: "/HTML/changePassword.htm",
     }) 
     .when("/ranklist", {
         templateUrl: "/HTML/ranklist.htm",
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

 app.controller("ranklistController",  function($scope,$http)  {
$http.get("dataRanklist").then(function (response)  {
$scope.data = response.data;
console.log("check controller");
console.log( response.data)
});
 });

 