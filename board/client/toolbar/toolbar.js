import toolbarTemplate from "./toolbar.html";
import createCardTemplate from "../createCard/createCard.html";
import searchTemplate from "../search/search.html";

angular.module("app").component("toolbar", {
    templateUrl: toolbarTemplate,
    controller: function ($mdSidenav, $mdBottomSheet) {
        let ctrl = this;
        ctrl.showUsersPane = function () {
            $mdSidenav("accounts").toggle();
        };
        ctrl.showSearchPane = function () {
            $mdBottomSheet.show({
                templateUrl: searchTemplate,
                controller: "searchController",
            });
        };
        ctrl.showCreateCardPane = function () {
            $mdBottomSheet.show({
                templateUrl: createCardTemplate,
                controller: "createCardCtrl",
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