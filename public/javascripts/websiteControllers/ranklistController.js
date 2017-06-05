

app.controller("ranklistController", function ($scope, $http) {
    $http.get("dataRanklist").then(function (response) {
        $scope.data = response.data;
    });
    var roundedOne = angular.element(document.querySelector('#roundedOne'));
    var ranklistContainer = angular.element(document.querySelector('#ranklistContainer'));
    var ranklistMenuButton = angular.element(document.querySelector('#ranklistMenuButton'));
    $(roundedOne).on("click", function () {
        $(ranklistContainer).delay(1000).fadeOut(1000);
    });

    $("#ranklistTable").on("click", ".ranklistUsername", function (event) {
        $("#messageTo").text("Send a message to " + event.target.textContent)
        $("#usermessageContactForm").delay(1000).fadeIn(1000);
        $("#toggledRanklistContainer").fadeOut(1000);
        $("#hiddenInputHelper").val(event.target.textContent.substr(1));
        $("#hiddenInputHelper").css("display", "none");
        $("#subject,#messageMail,#noSuccess,#noSuccess2").val("");
    });
    $("#messageToUserSubmit").on("click", function () {
        $("#successMessageToUser").fadeIn(1000);
        $("#usermessageContactForm").delay(3000).fadeOut(1000);
        $("#toggledRanklistContainer").delay(4000).fadeIn(1000);
        $("#successMessageToUser").delay(2000).fadeOut(1000);
    });
});