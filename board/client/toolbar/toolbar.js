import toolbarTemplate from "./toolbar.html";
import cardEditTemplate from "../cardEdit/cardEdit.html";
angular.module("app").component("toolbar", {
    templateUrl: toolbarTemplate,
    controller: function ($mdSidenav, $mdBottomSheet, $mdDialog) {
        const ctrl = this;
        let isFilterPaneShown = false;
        let isCreateCardDialogShown = false;
        ctrl.onClickUser = function () {
            $mdBottomSheet.hide();
            $mdDialog.hide();
            $mdSidenav("accounts").toggle();
        };
        ctrl.onClickFilter = function () {
            $mdSidenav("accounts").close();
            $mdDialog.hide();
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
            if (!isCreateCardDialogShown) {
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
                }).finally(function () {
                    isCreateCardDialogShown = false;
                });;
                isCreateCardDialogShown = true;
            }
        };
        ctrl.isLoggedIn = function () {
            return Meteor.user();
        };
    }
});