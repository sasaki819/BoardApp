import cardListTemplate from "./cardList.html";
import { cards } from "../../imports/models.js";
import { Session } from 'meteor/session';

angular.module("app").component("cardList", {
    templateUrl: cardListTemplate,
    controller: function ($scope) {
        $scope.subscribe("cards");
        $scope.helpers({
            cards() {
                return cards.find({}, {
                    sort: {
                        stared: -1,
                        createdAt: -1
                    }
                });
            },
            searchKeyword() {
                return Session.get("search.keyword");
            },
        });
    },
});