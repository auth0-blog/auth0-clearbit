(function () {

  'use strict';

  var myApp = angular.module('myApp', [
      'auth0.lock',
      'angular-jwt'
  ]);

  myApp.config(function config(lockProvider) {
    lockProvider.init({
      clientID: 'ABWIUkxZtn9EMy1QmH55AELCuI6eqBy6',
      domain: 'bkrebs.auth0.com'
    });
  });

  myApp.controller('homeController', function(lock, $timeout) {
    var ctrl = this;

    ctrl.login = lock.show;
    ctrl.loggedIn = false;

    ctrl.isLoggedIn = function () {
      return ctrl.loggedIn;
    }

    lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken);
      ctrl.loggedIn = true;

      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          return console.log(error);
        }
        $timeout(function() {
          profile.enrichment = profile.enrichment ? profile.enrichment : {};

          ctrl.user = profile;
          localStorage.setItem('profile', JSON.stringify(profile));
        }, 2500);
      });
    });
  });
})();
