export  default cardMenuCtrl = function ($scope) {
    $scope.openMenu = function($mdMenu, ev) {
        console.log("openMenu called");
        $mdMenu.open(ev);
    };
};