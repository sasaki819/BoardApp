angular.module("app").controller("searchController", function ($scope, $mdBottomSheet) {
    $scope.helpers({
        keyword() {
            return Session.get("search.keyword");
        }
    });
    $scope.reset = () => $scope.keyword = "";
    $scope.checkError = function () {
        if (!$scope.title) {
            return true;
        }
        if ($scope.selectedType === typeStock) {
            if ($scope.count === undefined || $scope.count < 0) {
                return true;
            }
            if ($scope.step === undefined || $scope.step <= 0) {
                return true;
            }
        }
        return false;
    };
});
