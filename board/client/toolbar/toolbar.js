import toolbarTemplate from "./toolbar.html";
import createCardTemplate from "../createCard/createCard.html";
import searchTemplate from "../search/search.html";

angular.module("app").component("toolbar", {
    templateUrl: toolbarTemplate,
    controller: function ($mdSidenav, $mdBottomSheet) {
        let ctrl = this;
        let isSearchPaneShown = false;
        let isCreateCardPaneShown = false;
        ctrl.showUsersPane = function () {
            $mdBottomSheet.hide();
            $mdSidenav("accounts").toggle();
        };
        ctrl.showSearchPane = function () {
            $mdSidenav("accounts").close();
            if (isSearchPaneShown) {
                $mdBottomSheet.hide();
            } else {
                $mdBottomSheet.show({
                    templateUrl: searchTemplate,
                    controller: "searchController",
                    disableBackdrop: true,
                    isLockedOpen: true,
                    disableParentScroll: false,
                }).then(function () {
                    isSearchPaneShown = false;
                }).catch(function () {
                    isSearchPaneShown = false;
                });
                isSearchPaneShown = true;
            }
        };
        ctrl.showCreateCardPane = function () {
            $mdSidenav("accounts").close();
            if (isCreateCardPaneShown) {
                $mdBottomSheet.hide();
            } else {
                $mdBottomSheet.show({
                    templateUrl: createCardTemplate,
                    controller: "createCardCtrl",
                }).then(function () {
                    isCreateCardPaneShown = false;
                }).catch(function () {
                    isCreateCardPaneShown = false;
                });
                isCreateCardPaneShown = true;
            }
        };
        ctrl.isLoggedIn = function () {
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