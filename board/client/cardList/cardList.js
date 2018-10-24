import cardListTemplate from "./cardList.html";
import { cards } from "../../imports/models.js";

angular.module("app").component("cardList", {
    templateUrl: cardListTemplate,
    controller: function ($scope) {
        $scope.subscribe("cards");
        $scope.helpers({
            cards() {
                return cards.find({}, {
                    sort: {
                        createdAt: -1
                    }
                });
            }
        });
    },
});