import angular from "angular";
import angularMeteor from "angular-meteor";
import "angular-animate";
import "angular-material";
import "angular-sanitize";
import { Accounts } from "meteor/accounts-base";
import { Session } from "meteor/session";

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY",
});

angular.module("app", [
  angularMeteor,
  "ngMaterial",
  "ngAnimate",
  "accounts.ui",
  "ngSanitize",
]);

require("./test/test.js");
require("./toolbar/toolbar.js");
require("./accounts/accounts.js");
require("./filter/filter.js");
require("./cardCreate/cardCreate.js");
require("./cardList/cardList.js");
require("./cardSummary/cardSummary.js");
require("./cardEdit/cardEdit.js");
require("./counter/counter.js");
require("./toggleIcon/toggleIcon.js");
require("./accordion/accordion.js");

Meteor.startup(function () {
  angular.bootstrap(document, ["app"]);
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
  // check if query parameter exists
  if (location.search) {
    // parse query string to object
    param = {};
    location.search.substring(1).split("&").forEach(
      pair => {
        let [k, v] = pair.split("=");
        param[k] = v;
      }
    );
    // update card
    switch (param.op) {
      case "set":
        let data = {};
        data[param.filed] = eval(param.value);
        Meteor.call("cards.update", param.id, data);
        break;
      case "countup":
        Meteor.call("cards.countup", param.id);
        break;
      case "countdown":
        Meteor.call("cards.countdown", param.id);
        break;
    };
  }
});

Tracker.autorun(function () {
  Meteor.status();
  Meteor.call("ping");
});
