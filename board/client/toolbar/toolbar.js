import toolbarTemplate from "./toolbar.html";

angular.module("app").component("toolbar", {
    templateUrl: toolbarTemplate,
    controller: function ($mdSidenav, $mdBottomSheet) {
        let ctrl = this;
        ctrl.showUsersPane = function () {
            $mdSidenav("users").open();
        };
        ctrl.showCreateCardPane = function () {
            $mdBottomSheet.show({
                templateUrl: 'imports/components/createCard/createCard.html',
                controller: 'createCardCtrl',
                parent: angular.element(document.getElementById('footer')),
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