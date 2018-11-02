angular.module("app").controller("cardEditController", function ($scope, $mdDialog, card) {
    $scope.card = angular.copy(card);
    if (!$scope.card.tags) {
        $scope.card.tags = [];
    }
    $scope.card.cardTag = ['toilet'];
    $scope.showConfirm = function (ev) {
        var confirm = $mdDialog.confirm()
            .title('Confirmation')
            .textContent('Are you sure you delete this card?')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('cancel!');

        $mdDialog.show(confirm).then(function () {
            $scope.onClickDelete();
        }, function () {
            
        });
    };
    $scope.onClickCountUp = function () {
        $scope.card.count++;
    };
    $scope.onClickCountDown = function () {
        $scope.card.count--;
    };
    $scope.onClickDelete = function () {
        console.log("onClickDelete called.", $scope.card._id);
        Meteor.call("cards.update", $scope.card._id, {deleted: true});
        $mdDialog.hide();
    };

    $scope.close = $mdDialog.cancel;

    $scope.updateCard = function () {
        Meteor.call("cards.update", $scope.card._id, $scope.card);
        $mdDialog.hide();
    };

    $scope.displayCounter = function () {
        if ($scope.type == "Stock") {
            return true;
        } else {
            return false;
        }
    };
});