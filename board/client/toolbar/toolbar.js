import toolbarTemplate from "./toolbar.html";
angular.module("app").component("toolbar", {
    templateUrl: toolbarTemplate,
    controller: function ($mdSidenav, $mdBottomSheet) {
        const ctrl = this;
        let isFilterPaneShown = false;
        let isCreateCardPaneShown = false;
        ctrl.showUsersPane = function () {
            $mdBottomSheet.hide();
            $mdSidenav("accounts").toggle();
        };
        ctrl.showFilterPane = function () {
            $mdSidenav("accounts").close();
            if (isFilterPaneShown) {
                $mdBottomSheet.hide();
            } else {
                $mdBottomSheet.show({
                    template: "<filter></filter>",
                    disableBackdrop: true,
                    isLockedOpen: true,
                    disableParentScroll: false,
                }).then(function () {
                    isFilterPaneShown = false;
                }).catch(function () {
                    isFilterPaneShown = false;
                });
                isFilterPaneShown = true;
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