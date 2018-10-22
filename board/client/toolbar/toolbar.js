import toolbarTemplate from "./toolbar.html";
import createCardTemplate from '../createCard/createCard.html';

angular.module("app").component("toolbar", {
    templateUrl: toolbarTemplate,
    controller: function ($mdSidenav, $mdBottomSheet) {
        let ctrl = this;
        ctrl.showUsersPane = function () {
            $mdSidenav("accounts").toggle();
        };
        ctrl.showCreateCardPane = function () {
            $mdBottomSheet.show({
                templateUrl: createCardTemplate,
                controller: 'createCardCtrl',
            });
        };
        ctrl.isLoggedIn = function(){
            return Meteor.user();
        };
    },
    bindings: {
        flag: "=",
        on: "@",
        off: "@",
        onToggle: "&",
    },
});