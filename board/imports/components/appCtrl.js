import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { cards } from '../models.js';
import cardEditTemplate from './cardEdit/cardEdit.html';
import createCardTemplate from './createCard/createCard.html';

export default appCtrl = function ($scope, $mdDialog, $mdBottomSheet, $mdSidenav) {
    $scope.subscribe('cards');
    $scope.test = "test";
    $scope.helpers({
        cards() {
            return cards.find();
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
            templateUrl: 'imports/components/cardEdit/cardEdit.html',
            controller: cardEditCtrl,
            locals: card,
            tergetEvent: ev,
            clickOutsideToClose: true,
            parent: angular.element(document.body)
        });
    };
    $scope.openMenu = function($mdMenu, ev) {
        console.log("openMenu called");
        $mdMenu.open(ev);
    };
    $scope.addCheckBox = function(card) {
        console.log(card);
        card.checked = false;
        console.log(card);
    };
};