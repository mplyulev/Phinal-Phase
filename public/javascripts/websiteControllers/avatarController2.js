
app.controller("avatarController", function ($scope, $http) {
    $http.get("data").then(function (response) {
        $scope.data = response.data;
    });
});