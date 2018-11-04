import cardSummaryTemplate from "./cardSummary.html";
import cardEditTemplate from "../cardEdit/cardEdit.html";

angular.module("app").component("cardSummary", {
    templateUrl: cardSummaryTemplate,
    controller: function ($scope, $mdDialog) {
        const ctrl = this;
        ctrl.onClickFavorite = function () {
            Meteor.call("cards.update", ctrl.card._id, { stared: ctrl.card.stared });
        };
        ctrl.onClickPrivate = function () {
            Meteor.call("cards.update", ctrl.card._id, { private: ctrl.card.private });
        };
        ctrl.onCLickDelete = function () {
            Meteor.call("cards.remove", ctrl.card._id);
        };
        ctrl.onClickComplete = function () {
            Meteor.call("cards.update", ctrl.card._id, { checked: ctrl.card.checked });
        }
        ctrl.onClickCountUp = function () {
            Meteor.call("cards.update", ctrl.card._id, { count: ctrl.card.count + 1 });
        };
        ctrl.onClickCountDown = function () {
            Meteor.call("cards.update", ctrl.card._id, { count: ctrl.card.count - 1 });
        };
        ctrl.onClickEdit = function ($event) {
            $mdDialog.show({
                templateUrl: cardEditTemplate,
                controller: "cardEditController",
                locals: {
                    card: ctrl.card,
                },
                tergetEvent: $event,
                clickOutsideToClose: true
            });
        };
        ctrl.showConfirm = function (ev) {
            console.log("showConfirm", ctrl.card.deleted);
            // check if card is deleted
            if (ctrl.card.deleted === false) {
                // when card is not deleted
                const confirm = $mdDialog.confirm()
                    .title('Confirmation')
                    .textContent('Are you sure you delete this card?')
                    .targetEvent(ev)
                    .ok('OK')
                    .cancel('Cancel');
                confirm._options.multiple = true;
                $mdDialog.show(confirm).then(function () {
                    Meteor.call("cards.update", ctrl.card._id, { deleted: true });
                    $mdDialog.hide();
                }, function () {
                    //「キャンセル」押した場合の処理なし
                });
            } else {
                const localCard = angular.copy(ctrl.card);
                localCard.deleted = false;
                $mdDialog.show({
                    templateUrl: cardEditTemplate,
                    controller: "cardEditController",
                    locals: {
                        card: localCard,
                    },
                    tergetEvent: ev,
                    clickOutsideToClose: true
                });
            }
        };
    },
    bindings: {
        card: "=",
    },
});