import angular from "angular";
import angularMeteor from "angular-meteor";
import "angular-animate";
import "angular-material";
import { Accounts } from "meteor/accounts-base";

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY",
});

angular.module("app", [
  angularMeteor,
  "ngMaterial",
  "ngAnimate",
  "accounts.ui"
]);

require("./test/test.js");
require("./toolbar/toolbar.js");
require("./accounts/accounts.js");
require("./search/search.js");
require("./cardCreate/cardCreate.js");
require("./cardList/cardList.js");
require("./cardSummary/cardSummary.js");
require("./cardEdit/cardEdit.js");
require("./counter/counter.js");
require("./toggleIcon/toggleIcon.js");
require("./accordion/accordion.js");

Meteor.startup(function () {
  angular.bootstrap(document, ["app"]);
});

Tracker.autorun(function () {
  Meteor.status();
  Meteor.call("ping");
});
