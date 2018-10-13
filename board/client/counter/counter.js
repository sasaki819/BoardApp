import counterTemplate from "./counter.html";

angular.module("app").component("counter", {
    templateUrl: counterTemplate,
    controller: "counterController",
    bindings: {
        count: "=",
    },
})

angular.module("app").controller("counterController", function ($scope) {
    $scope.increment = function () {
        $scope.$ctrl.count++;
    };
    $scope.decrement = function () {
        $scope.$ctrl.count--;
    };
});