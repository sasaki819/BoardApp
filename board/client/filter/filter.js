import filterTemplate from "./filter.html";
import { Session } from 'meteor/session';

angular.module("app").component("filter", {
    templateUrl: filterTemplate,
    controller: function ($scope) {
        const ctrl = this;
        ctrl.$onInit = () => {
            ctrl.keyword = Session.get("filter.keyword");
            ctrl.showTask = Session.get("filter.showTask");
            ctrl.showStock = Session.get("filter.showStock");
            ctrl.showMemo = Session.get("filter.showMemo");
            ctrl.showCompleteTask = Session.get("filter.showCompleteTask");
            ctrl.showIncompleteTask = Session.get("filter.showIncompleteTask");
            ctrl.showPrivate = Session.get("filter.showPrivate");
            ctrl.showDeleted = Session.get("filter.showDeleted");
            ctrl.tags = Session.get("filter.tags");
            ctrl.sortStared = Session.get("sort.stared");
            ctrl.sortBy = Session.get("sort.by");
        };
        ctrl.onChange = function () {
            Session.set("filter.keyword", ctrl.keyword);
            Session.set("filter.showTask", ctrl.showTask);
            Session.set("filter.showStock", ctrl.showStock);
            Session.set("filter.showMemo", ctrl.showMemo);
            Session.set("filter.showCompleteTask", ctrl.showCompleteTask);
            Session.set("filter.showIncompleteTask", ctrl.showIncompleteTask);
            Session.set("filter.showPrivate", ctrl.showPrivate);
            Session.set("filter.showDeleted", ctrl.showDeleted);
            Session.set("filter.tags", ctrl.tags);
            Session.set("sort.stared", ctrl.sortStared);
            Session.set("sort.by", ctrl.sortBy);
        };
    },
});
