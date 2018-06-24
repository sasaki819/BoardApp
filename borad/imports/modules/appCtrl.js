import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Cards } from '../models.js';

export default appCtrl = function ($scope) {
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
};