import { connections } from '../../imports/models.js';
import accountsTemplate from "./accounts.html";

angular.module("app").component("accounts", {
    templateUrl: accountsTemplate,
    controller: function ($scope) {
        let ctrl = this;
        $scope.subscribe('users');
        $scope.subscribe("connections");
        ctrl.isLoggedIn = function () {
            return Meteor.user() !== null;
        };
        ctrl.username = function () {
            return Meteor.user() ? Meteor.user().username : "Guest";
        };
        ctrl.userExists = function () {
            return Meteor.users.find({ username: ctrl.name }).count() > 0;
        };
        ctrl.login = function () {
            if (ctrl.userExists()) {
                Meteor.loginWithPassword(
                    ctrl.name,
                    ctrl.password,
                    loginCallback
                );
            } else {
                Accounts.createUser({
                    username: ctrl.name,
                    password: ctrl.password,
                    loginCallback
                });
            };
            function loginCallback() {
                Meteor.call("ping");
            };
        };
        ctrl.logout = function () {
            Meteor.logout(logoutCallback);
            function logoutCallback() {
                Meteor.call("ping");
            };
        };
        $scope.helpers({
            onlineUsers() {
                return Meteor.users.find(
                    {
                        username: {
                            $ne: ctrl.username()
                        }
                    }
                ).map(
                    user => user.username
                ).filter(
                    username => connections.find(
                        {
                            username: username
                        }
                    ).count() > 0
                ).sort();
            },
            guestUsers() {
                let count = Math.max(
                    0,
                    connections.find(
                        {
                            username: ""
                        }
                    ).count() - (Meteor.user() !== null ? 0 : 1)
                );
                return count == 0 ? [] : Array(count).fill("Guest");
            },
            offlineUsers() {
                return Meteor.users.find(
                    {
                        username: {
                            $ne: ctrl.username()
                        }
                    }
                ).map(
                    user => user.username
                ).filter(
                    username => connections.find(
                        {
                            username: username
                        }
                    ).count() == 0
                );
            },
        });
    },
});