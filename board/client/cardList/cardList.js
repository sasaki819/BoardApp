import cardListTemplate from "./cardList.html";
import { cards } from "../../imports/models.js";
import { Session } from 'meteor/session';

angular.module("app").component("cardList", {
    templateUrl: cardListTemplate,
    controller: function ($scope) {
        $scope.subscribe("cards");
        $scope.helpers({
            cards() {
                return cards.find(
                    {
                        $or: [
                            { private: { $ne: true } },
                            { createdBy: Meteor.user() ? Meteor.user().username : "" }
                        ]
                    }
                );
            },
            filterKeyword() {
                return Session.get("filter.keyword");
            },
            filterShowTask() {
                return Session.get("filter.showTask");
            },
            filterShowStock() {
                return Session.get("filter.showStock");
            },
            filterShowMemo() {
                return Session.get("filter.showMemo");
            },
            filterShowCompleteTask() {
                return Session.get("filter.showCompleteTask");
            },
            filterShowIncompleteTask() {
                return Session.get("filter.showIncompleteTask");
            },
            filterShowPrivate() {
                return Session.get("filter.showPrivate");
            },
            filterShowDeleted() {
                return Session.get("filter.showDeleted");
            },
            filterTags() {
                return Session.get("filter.tags");
            },
            filterSortStared() {
                return Session.get("sort.stared");
            },
            filterSortBy() {
                return Session.get("sort.by");
            },
        });
        $scope.filter = function (card) {
            const keywordRE = RegExp($scope.filterKeyword, "i");
            if (!(keywordRE.test(card.title) || keywordRE.test(card.content))) {
                return false;
            }
            if (!$scope.filterShowTask && card.type === "Todo") {
                return false;
            }
            if (!$scope.filterShowStock && card.type === "Stock") {
                return false;
            }
            if (!$scope.filterShowMemo && card.type === "Memo") {
                return false;
            }
            if (!$scope.filterShowCompleteTask && card.checked) {
                return false;
            }
            if (!$scope.filterShowIncompleteTask && card.checked === false) {
                return false;
            }
            if (!$scope.filterShowPrivate && card.private) {
                return false;
            }
            if (!$scope.filterShowDeleted && card.deleted) {
                return false;
            }
            if ($scope.filterTags.length > 0) {
                if (card.tags === undefined) {
                    return false;
                }
                let allTagsIncluded = true;
                $scope.filterTags.forEach(function (tag) {
                    if (!card.tags.includes(tag)) {
                        allTagsIncluded = false;
                    };
                });
                if (!allTagsIncluded) {
                    return false;
                };
            }
            return true;
        };
        $scope.sortStared = function (card) {
            if ($scope.filterSortStared) {
                return card.stared ? 0 : 1;
            } else {
                return 0;
            }
        };
        $scope.sort = function (card) {
            const TypeOrder = ["Memo", "Stock", "Task"];
            switch ($scope.filterSortBy) {
                case "updatedAt":
                    return card.updatedAt;
                case "createdAt":
                    return card.createdAt;
                case "type":
                    return TypeOrder.indexOf(card.type);
            };
        };
    },
});