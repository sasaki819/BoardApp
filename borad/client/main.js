import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router'
import { Accounts } from 'meteor/accounts-base';
import appCtrl from '../imports/components/appCtrl.js';
import cardEditCtrl from '../imports/components/cardEdit/cardEdit.js';
import cardMenuCtrl from '../imports/components/cardMenu.js';
import createCardCtrl from '../imports/components/createCard/createCard.js';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

angular.module('app', [
  angularMeteor,
  'ngMaterial',
  'accounts.ui'
])
.controller('appCtrl', appCtrl)
.controller('cardEditCtrl', cardEditCtrl)
.controller('cardMenuCtrl', cardMenuCtrl)
.controller('createCardCtrl', createCardCtrl)
;
