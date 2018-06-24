import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router'
import { Accounts } from 'meteor/accounts-base';
import appCtrl from '../imports/modules/appCtrl.js';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

angular.module('app', [
  angularMeteor,
  'ngMaterial',
  'accounts.ui'
])
.controller('appCtrl', appCtrl);