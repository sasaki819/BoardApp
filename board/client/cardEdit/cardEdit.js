angular.module("app").controller("cardEditController", function ($scope, $mdDialog, card, ok) {
    $scope.card = angular.copy(card);
    $scope.ok = ok;
    if (!$scope.card.tags) {
        $scope.card.tags = [];
    }
    $scope.showConfirm = function (ev) {
        const confirm = $mdDialog.confirm()
            .title('確認')
            .textContent('カードを削除しますか?')
            .targetEvent(ev)
            .ok('はい')
            .cancel('いいえ');
        confirm._options.multiple = true;
        $mdDialog.show(confirm).then(function () {
            Meteor.call("cards.update", $scope.card._id, { deleted: true });
            $mdDialog.hide();
        }, function () {
            //「キャンセル」押した場合の処理なし
        });
    };
    $scope.onClickCountUp = function () {
        $scope.card.count++;
    };
    $scope.onClickCountDown = function () {
        $scope.card.count--;
    };
    $scope.lasttime = function (updatedAt) {
        return updatedAt;
    };
    $scope.close = $mdDialog.cancel;

    $scope.onSubmit = function () {
        if ($scope.card.deleted) {
            $scope.card.deleted = false;
        }
        if ($scope.card._id) {
            Meteor.call("cards.update", $scope.card._id, $scope.card);
        } else {
            Meteor.call("cards.add", $scope.card);
        }
        $mdDialog.hide();
    };
});