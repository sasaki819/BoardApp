import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Cards } from '../models.js';
import cardEditTemplate from './cardEdit/cardEdit.html';

export default appCtrl = function ($scope, $mdDialog) {
    $scope.subscribe('cards');
    $scope.test = "test";
    $scope.helpers({
        cards() {
            return Cards.find();
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
    $scope.test = function () {
        console.log("TEST ");
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