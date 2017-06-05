app.controller('messageController', function ($scope) {
    var messageArea = angular.element(document.querySelector('#messageMail'));
    var subject = angular.element(document.querySelector('#subject'));
    var sendButton = angular.element(document.querySelector('#messageSubmit'));
    var successMessage = angular.element(document.querySelector('#success'));
    var noSuccessMessage = angular.element(document.querySelector('#noSuccess'));
    var noSuccessMessage2 = angular.element(document.querySelector('#noSuccess2'));
    var form = angular.element(document.querySelector('#messageForm'));
    $(sendButton).on('click', function (event) {
        function preventDefault(e) {
            e.preventDefault();
        }

        if (messageArea.val().length > 1 && subject.val().length > 0) {

            $(successMessage).fadeIn(1000).delay(2500).fadeOut(1000);
            $(successMessage).css("display", "block");
        }

        if (messageArea.val().length < 1) {
            $(noSuccessMessage2).toggle();
            $(noSuccessMessage).show(1000).delay(2500).fadeOut(1000);
        }
        if (subject.val().length < 1) {
            $(noSuccessMessage2).toggle();
            $(noSuccessMessage2).show(1000).delay(2500).fadeOut(1000);
        }
    });
});

