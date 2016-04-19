(function () {
  'use strict'

  angular
    .module('notesee.landing')
    .config(config)

  function config ($stateProvider) {
    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingController as landing'
      })
  }
})()
