import searchemplate from "./search.html";
import { Session } from 'meteor/session';

angular.module("app").component("search", {
    templateUrl: searchemplate,
    controller: function ($scope) {
        const ctrl = this;
        ctrl.keyword = Session.get("search.keyword");
        $scope.helpers({
            searchKeyword() {
                return Session.get("search.keyword");
            }
        });
        ctrl.clearKeyword = function () {
            ctrl.keyword = "";
        };
        ctrl.onChangeKeyword = function () {
            Session.set("search.keyword", ctrl.keyword);
            console.log("changed keyword to:", ctrl.keyword);
        };
    },
});
