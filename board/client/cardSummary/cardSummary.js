import cardSummaryTemplate from "./cardSummary.html";

angular.module("app").component("cardSummary",{
    templateUrl: cardSummaryTemplate,
    controller: "cardSummaryController",
    bindings: {
        card: "=",
    },
})

angular.module("app").controller("cardSummaryController", function ($scope) {
    $scope.message = "test"
    $scope.debug = function () {
        console.log($scope);
    };
});