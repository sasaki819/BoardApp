import testTemplate from "./test.html";

angular.module("app").component("test", {
    templateUrl: testTemplate,
    controller: "testController"
});

angular.module("app").controller("testController", function ($scope) {
    $scope.message = "test message"
});