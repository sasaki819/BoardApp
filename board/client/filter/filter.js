import { _ } from 'underscore';
import { cards } from '../../imports/models.js';
import { Session } from 'meteor/session';
import filterTemplate from "./filter.html";

angular.module("app").component("filter", {
    templateUrl: filterTemplate,
    controller: function ($scope) {
        const ctrl = this;
        $scope.subscribe("cards");
        $scope.helpers({
            tags() {
                const added = {};
                const tags = [];
                cards.find(
                    {
                        tags: {
                            $exists: true,
                            $not: { $size: 0 }
                        }
                    }, {
                        fields: {
                            tags: 1
                        }
                    }
                ).map(card => {
                    // this function get performance at the expense of beauty
                    const length = card.tags.length;
                    for (let i = 0; i < length; i ++) {
                        const tag = card.tags[i];
                        if (added[tag] !== 1) {
                            added[tag] = 1;
                            tags[tags.length] = tag;
                        }
                    }
                });
                return tags;
            },
        });
        ctrl.$onInit = () => {
            ctrl.keyword = Session.get("filter.keyword");
            ctrl.showTask = Session.get("filter.showTask");
            ctrl.showStock = Session.get("filter.showStock");
            ctrl.showMemo = Session.get("filter.showMemo");
            ctrl.showCompleteTask = Session.get("filter.showCompleteTask");
            ctrl.showIncompleteTask = Session.get("filter.showIncompleteTask");
            ctrl.showPrivate = Session.get("filter.showPrivate");
            ctrl.showDeleted = Session.get("filter.showDeleted");
            ctrl.selectedTags = Session.get("filter.tags");
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
            Session.set("filter.tags", ctrl.selectedTags);
            Session.set("sort.stared", ctrl.sortStared);
            Session.set("sort.by", ctrl.sortBy);
        };
        ctrl.onReset = function () {
            Session.set("filter.keyword", "");
            Session.set("filter.showTask", true);
            Session.set("filter.showStock", true);
            Session.set("filter.showMemo", true);
            Session.set("filter.showCompleteTask", true);
            Session.set("filter.showIncompleteTask", true);
            Session.set("filter.showPrivate", true);
            Session.set("filter.showDeleted", false);
            Session.set("filter.tags", []);
            Session.set("sort.stared", true);
            Session.set("sort.by", "createdAt");
            ctrl.$onInit();
        };
        ctrl.onClickTag = function(tag, value) {
            const index= ctrl.selectedTags.indexOf(tag);
            if (index > -1) {
                ctrl.selectedTags.splice(index, 1);
            }else{
                ctrl.selectedTags.push(tag);
            }
            ctrl.onChange();
        };
        ctrl.isSelected = function(tag) {
            return ctrl.selectedTags.indexOf(tag) > -1
        };
    },
});
