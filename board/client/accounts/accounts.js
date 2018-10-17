import accountsTemplate from "./accounts.html";

angular.module("app").component("accounts", {
    templateUrl: accountsTemplate,
    controller: function ($scope) {
        let ctrl = this;
        $scope.subscribe('users');
        $scope.helpers({
            users() {
                let user = Meteor.user();
                return Meteor.users.find({ username: { $ne: user && user.username } });
            }
        });
        ctrl.isLoggedIn = function () {
            return Meteor.user() !== null;
        };
        ctrl.userExists = function () {
            return Meteor.users.find({ username: ctrl.name }).count() > 0;
        }
        ctrl.login = function () {
            if (ctrl.userExists()) {
                Meteor.loginWithPassword(ctrl.name, ctrl.password);
            } else {
                Accounts.createUser({
                    username: ctrl.name,
                    password: ctrl.password,
                });
            }
        };
        ctrl.logout = function () {
            Meteor.logout();
        };
        ctrl.ausername = function () {
            let user = Meteor.user();
            return user && user.username;
        };
    },
});