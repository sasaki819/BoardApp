angular.module("app").controller("cardEditController", function ($scope, $mdDialog, card) {
    $scope.card = angular.copy(card);
    if (!$scope.card.tags) {
        $scope.card.tags = [];
    }
    $scope.card.cardTag = ['toilet'];
    $scope.showConfirm = function (ev) {
        console.log("showConfirm", $scope.card.deleted);
        if ($scope.card.deleted === false) {
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
            //deletedがtrueの場合
        } else {
            //deletedの状態では、cardEditは開けないため、以下は不要な処理
            const confirm = $mdDialog.confirm()
                .title('確認')
                .textContent('カードを再利用しますか?')
                .targetEvent(ev)
                .ok('はい')
                .cancel('いいえ');
            confirm._options.multiple = true;
            $mdDialog.show(confirm).then(function () {
                Meteor.call("cards.update", $scope.card._id, { deleted: false });
                $mdDialog.hide();
            }, function () {
                //「キャンセル」押した場合の処理なし
            });
        }
    };
    $scope.onClickCountUp = function () {
        $scope.card.count++;
    };
    $scope.onClickCountDown = function () {
        $scope.card.count--;
    };

    $scope.close = $mdDialog.cancel;

    $scope.updateCard = function () {
        Meteor.call("cards.update", $scope.card._id, $scope.card);
        $mdDialog.hide();
    };
});