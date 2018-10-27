import toolbarTemplate from "./toolbar.html";
import cardCreateTemplate from "../cardCreate/cardCreate.html";
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
                    template: "<search></search>",
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
                    template: "<card-create></card-create>",
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