angular.module("app").controller("cardEditController", function ($scope, $mdDialog, card) {

    $scope.card = angular.copy(card);
    $scope.showConfirm = function (ev) {
        var confirm = $mdDialog.confirm()
            .title('Confirmation')
            .textContent('Are you sure delete this card ?')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('cancel!');

        $mdDialog.show(confirm).then(function () {
            $scope.onCLickDelete();
        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    $scope.card.cardTag = ['toilet'];
    $scope.addTag = function(){
        // if(window.event.keyCode==13){
        //     $scope.cardTag.push();
        // }
        // if (event.which === 13) {
            console.log("addTag called.", $scope.card.cardTag);
            $scope.card.cardTag.push($scope.card.cardTag);
        // }
    };

    $scope.onCLickDelete = function () {
        console.log("deleteCard called.", $scope.card._id);
        Meteor.call("cards.remove", $scope.card._id);
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

    $scope.onClickFavorite = function () {
        Meteor.call("cards.update", $scope.card._id, { stared: ctrl.card.stared });
    };
    $scope.onClickPrivate = function () {
        Meteor.call("cards.update", $scope.card._id, { private: ctrl.card.private });
    };
    $scope.onClickComplete = function () {
        Meteor.call("cards.update", $scope.card._id, { checked: ctrl.card.checked });
    }

});