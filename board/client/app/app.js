import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { cards } from '../../imports/models.js';
import cardEditTemplate from '../../imports/components/cardEdit/cardEdit.html';

angular.module("app").controller("appCtrl", function ($scope, $mdDialog, $mdBottomSheet, $mdSidenav) {
    $scope.subscribe('cards');
    $scope.test = "test";
    $scope.helpers({
        cards() {
            return cards.find({}, {
                sort: {
                    createdAt: -1
                }
            });
        }
    });
    $scope.add = function () {
        let newCard = {};
        newCard.title = $scope.title;
        Meteor.call('cards.add', newCard);
        $scope.title = "";
    };
    $scope.showDialog = function (ev, card) {
        console.log("showDialog invoked");
        return;
        $mdDialog.show({
            templateUrl: cardEditTemplate,
            controller: cardEditCtrl,
            locals: card,
            tergetEvent: ev,
            clickOutsideToClose: true,
            parent: angular.element(document.body)
        });
    };
    $scope.openMenu = function ($mdMenu, ev) {
        console.log("openMenu called");
        $mdMenu.open(ev);
    };
    $scope.addCheckBox = function (card) {
        console.log(card);
        card.checked = false;
        console.log(card);
    };
});