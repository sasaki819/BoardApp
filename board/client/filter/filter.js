import filterTemplate from "./filter.html";
import { Session } from 'meteor/session';

angular.module("app").component("filter", {
    templateUrl: filterTemplate,
    controller: function ($scope) {
        const ctrl = this;
        ctrl.keyword = Session.get("filter.keyword");
        $scope.helpers({
            filterKeyword() {
                return Session.get("filter.keyword");
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
