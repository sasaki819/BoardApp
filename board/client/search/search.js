import { Session } from 'meteor/session';

angular.module("app").controller("searchController", function ($scope) {
    $scope.helpers({
        searchKeyword() {
            return Session.get("search.keyword");
        }
    });
    $scope.reset = function () {
        $scope.keyword = "";
    };
    $scope.onChangeKeyword = function () {
        Session.set("search.keyword", $scope.keyword);
        console.log("changed keyword to:", $scope.keyword);
    };
});
