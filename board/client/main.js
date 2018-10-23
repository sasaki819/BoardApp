import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

angular.module('app', [
  angularMeteor,
  'ngMaterial',
  'accounts.ui'
]);

//import appCtrl from '../imports/components/appCtrl.js';
//angular.module('app').controller('appCtrl', appCtrl);

import cardEditCtrl from '../imports/components/cardEdit/cardEdit.js';
angular.module('app').controller('cardEditCtrl', cardEditCtrl);

import createCardCtrl from '../imports/components/createCard/createCard.js';
angular.module('app').controller('createCardCtrl', createCardCtrl);

import usersCtrl from '../imports/components/users/users.js';
angular.module('app').controller('usersCtrl', usersCtrl);

Meteor.startup(function () {
  angular.bootstrap(document, ["app"]);
});

require("./test/test.js");
require("./app/app.js");
require("./cardSummary/cardSummary.js");
require("./toggleIcon/toggleIcon.js");
require("./counter/counter.js");
require("./toolbar/toolbar.js");
require("./accounts/accounts.js");
require("./accordion/accordion.js");


Tracker.autorun(function () {
  Meteor.status();
  Meteor.call('ping');
});