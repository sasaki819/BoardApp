import toolbarTemplate from "./toolbar.html";
import cardEditTemplate from "../cardEdit/cardEdit.html";
angular.module("app").component("toolbar", {
    templateUrl: toolbarTemplate,
    controller: function ($mdSidenav, $mdBottomSheet, $mdDialog) {
        const ctrl = this;
        let isFilterPaneShown = false;
        let isCreateCardPaneShown = false;
        ctrl.onClickUser = function () {
            $mdBottomSheet.hide();
            $mdSidenav("accounts").toggle();
        };
        ctrl.onClickFilter = function () {
            $mdSidenav("accounts").close();
            if (isFilterPaneShown) {
                $mdBottomSheet.hide();
            } else {
                $mdBottomSheet.show({
                    template: "<filter></filter>",
                    disableBackdrop: true,
                    escapeToClose: true,
                    clickOutsideToClose: true,
                    disableParentScroll: false,
                }).then(function () {
                    isFilterPaneShown = false;
                }).catch(function () {
                    isFilterPaneShown = false;
                });
                isFilterPaneShown = true;
            }
        };
        ctrl.onClickCreate = function ($event) {
            $mdSidenav("accounts").close();
            $mdBottomSheet.hide();
            $mdDialog.show({
                templateUrl: cardEditTemplate,
                controller: "cardEditController",
                locals: {
                    card: {
                    },
                    ok: "作成",
                },
                tergetEvent: $event,
                clickOutsideToClose: true,
            });
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