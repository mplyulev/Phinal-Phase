
app.controller("nameSortController", function ($scope) {
    $scope.filterString = '';
    $scope.sortByName = false;
    $scope.sortOrder = '';
    $scope.setSortOrder = function () {
        if ($scope.sortByName) {
            $scope.sortOrder = 'username';
        }
        else {
            $scope.sortOrder = 'mitko';
        }
    }
});/**
 * Created by mihail.lyulev on 5.6.2017 г..
 */
