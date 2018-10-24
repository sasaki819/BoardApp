import cardSummaryTemplate from "./cardSummary.html";
import cardEditTemplate from "../cardEdit/cardEdit.html";

angular.module("app").component("cardSummary", {
    templateUrl: cardSummaryTemplate,
    controller: function ($scope,$mdDialog) {
        let ctrl = this;
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
            Meteor.call("cards.update", ctrl.card._id, {count: ctrl.card.count+1});
        };
        ctrl.onClickCountDown = function () {
            Meteor.call("cards.update", ctrl.card._id, {count: ctrl.card.count-1});
        };
        ctrl.onClickEdit = function () {
            $mdDialog.show({
                templateUrl: cardEditTemplate,
                controller: "cardEditController",
                card: $scope.card,
                tergetEvent: $scope.ev,
                clickOutsideToClose: true,
                parent: angular.element(document.body)
            });
        };
    },
    bindings: {
        card: "=",
    },
});