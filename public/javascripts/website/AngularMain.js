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
         templateUrl: "/HTML/contacts.htm",
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
});
 });
 app.controller("nameSortController",  function($scope,$http)  {
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
 
app.controller('usernameSortController', function($scope,$http) {
    $http.get("dataRanklist").then(function (response)  {
$scope.data = response.data;
console.log("check controller");
  $scope.orderByField = 'username';
  $scope.reverseSort = false;
});
});

 

 