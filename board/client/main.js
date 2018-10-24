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
require("./cardList/cardList.js");
require("./cardSummary/cardSummary.js");
require("./toggleIcon/toggleIcon.js");
require("./counter/counter.js");
require("./accounts/accounts.js");
require("./cardEdit/cardEdit.js");
require("./createCard/createCard.js");
require("./accordion/accordion.js");
require("./toolbar/toolbar.js");

Meteor.startup(function () {
  angular.bootstrap(document, ["app"]);
});

Tracker.autorun(function () {
  Meteor.status();
  Meteor.call("ping");
});
