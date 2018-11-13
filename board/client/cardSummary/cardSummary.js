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
                    ok: "更新",
                },
                tergetEvent: $event,
                clickOutsideToClose: true
            });
        };
        ctrl.onClickRestore = function($event) {
            $mdDialog.show({
                templateUrl: cardEditTemplate,
                controller: "cardEditController",
                locals: {
                    card: ctrl.card,
                    ok: "復元",
                },
                tergetEvent: $event,
                clickOutsideToClose: true
            });
        };
        ctrl.isCreatedByMyself = function () {
            return ctrl.card.createdBy === (Meteor.user() ? Meteor.user().username : "");
        };
        ctrl.isFresh = function () {
            return (new Date() - ctrl.card.updatedAt) < 15000;
        };
        ctrl.cardType = function () {
            if (ctrl.card.hasCheckbox) {
                ctrl.card.type="Task"
            } else if (ctrl.card.hasCounter){
                ctrl.card.type="Stock"
            } else {
                ctrl.card.type="Memo"
            }
            return ctrl.card.type;
        };
    },
    bindings: {
        card: "=",
    },
});