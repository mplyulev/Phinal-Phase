app.controller('usernameSortController', function ($scope, $http) {
    $http.get("dataRanklist").then(function (response) {
        $scope.data = response.data;
        $scope.orderByField = 'username';
        $scope.reverseSort = false;
    });
});
