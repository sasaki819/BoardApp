import counterTemplate from "./counter.html";

angular.module("app").component("counter", {
    templateUrl: counterTemplate,
    controller: "counterController",
    bindings: {
        count: "=",
        unit: "<",
        onCountUp: "&",
        onCountDown: "&",
    },
})

angular.module("app").controller("counterController", function ($scope) {
    $scope.increment = function () {
        $scope.$ctrl.onCountUp();
    };
    $scope.decrement = function () {
        $scope.$ctrl.onCountDown();
    };
});