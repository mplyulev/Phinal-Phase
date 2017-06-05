app.controller("userToUserMessageController", function ($scope, $http) {
    $http.get("data").then(function (response) {
        $scope.data = response.data[0].inboxMessages;
    });
    $("#messagesTable").on("click", ".messagesTh", function (event) {
        var clickedRow = event.target;
        var messageBody = $(clickedRow).parent().children().last();
        var text = messageBody[0].innerHTML;
        $("#messageFrom").text("From: " + event.target.textContent)
        $("#messageBodyTextParagraph").text(text);
        $("#userMessageContainer").delay(1200).fadeIn(1000);
        $("#messagesTable").delay(300).fadeOut(1000);
    });
    $("#backToMessages").on("click", function () {
        $("#userMessageContainer").delay(300).fadeOut(1000);
        $("#messagesTable").delay(1200).fadeIn(1000);
    })
});