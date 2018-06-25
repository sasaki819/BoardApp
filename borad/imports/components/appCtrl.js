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
        $mdDialog.show({
            templateUrl: 'imports/components/cardEdit/cardEdit.html',
            tergetEvent: ev,
            clickOutsideToClose: true,
            controller: cardEditCtrl,
            locals: card,
            parent: angular.element(document.body)
        });
    }
};