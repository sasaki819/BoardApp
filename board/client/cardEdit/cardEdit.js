angular.module("app").controller("cardEditController", function ($scope, $mdDialog, card, ok) {
    $scope.ok = ok;
    $scope.card = {};
    if (card._id) {
        $scope.card._id = card._id;
    }
    $scope.card.title = (card.title || "");
    $scope.card.stared = (card.stared || false);
    $scope.card.private = (card.private || false);
    $scope.card.deleted = (card.deleted || false);
    $scope.card.hasCheckbox = (card.hasCheckbox || false);
    $scope.card.hasCounter = (card.hasCounter || false);
    $scope.card.hasDescription = (card.hasDescription || false);
    $scope.card.checked = (card.checked || false);
    $scope.card.count = (card.count || 0);
    $scope.card.step = (card.step || 1);
    $scope.card.unit = (card.unit || "");
    $scope.card.description = (card.description || "");
    $scope.card.tags = (card.tags || []);
    if (card.createBy) {
        $scope.card.createBy = card.createdBy;
    }
    if (card.createdAt) {
        $scope.card.createdAt = card.createdAt;
    }
    if (card.updatedBy) {
        $scope.card.updatedBy = card.updatedBy;
    }
    if (card.updatedAt) {
        $scope.card.updatedAt = card.updatedAt;
    }
    if ($scope.card.hasCheckbox) {
        $scope.card.type = "Task"
    } else if ($scope.card.hasCounter) {
        $scope.card.type = "Stock"
    } else {
        $scope.card.type = "Memo"
    };
    $scope.onClickDeletePermanently = function (ev) {
        const confirm = $mdDialog.confirm()
            .title('確認')
            .htmlContent('カードを完全に削除しますか?<br>(元に戻す事はできません)')
            .targetEvent(ev)
            .ok('はい')
            .cancel('いいえ');
        confirm._options.multiple = true;
        $mdDialog.show(confirm).then(function () {
            Meteor.call("cards.remove", $scope.card._id);
            $mdDialog.hide();
        }, function () {
            //「キャンセル」押した場合の処理なし
        });
    };
    $scope.onClickDelete = function (ev) {
        const confirm = $mdDialog.confirm()
            .title('確認')
            .htmlContent('カードを削除しますか?<br>(後で復活させる事ができます)')
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
    $scope.close = $mdDialog.cancel;
});