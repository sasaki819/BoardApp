import { Meteor } from "meteor/meteor";
//import { users } from '../../models.js';

export default usersCtrl = function ($scope, $mdSidenav) {
    $scope.subscribe("users");
    $scope.helpers({
        users() {
            return Meteor.users.find();
        }
    });
    $scope.close = () => {
        console.log("closing users pane");
        $mdSidenav('users').close();
    };
};