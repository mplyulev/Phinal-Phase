var app = angular.module("myApp", ["ngRoute"]);

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













