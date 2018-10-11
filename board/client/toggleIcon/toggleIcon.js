import toggleIconTemplate from "./toggleIcon.html";

angular.module("app").component("toggleIcon", {
    templateUrl: toggleIconTemplate,
    controller: "toggleIconController",
    bindings: {
        flag: "=",
        on: "<",
        off: "<",
    },
})

angular.module("app").controller("toggleIconController", function ($scope, $timeout) {
    function setIconName() {
        $scope.iconName = $scope.$ctrl.flag ? $scope.$ctrl.on : $scope.$ctrl.off;
    };
    $scope.onClick = function () {
        $scope.$ctrl.flag = !$scope.$ctrl.flag;
        setIconName();
    };
    $timeout(setIconName);
});