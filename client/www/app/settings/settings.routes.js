(function () {
  'use strict'

  angular
    .module('notesee.settings')
    .config(config)

  function config ($stateProvider) {
    $stateProvider
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'app/settings/settings.html',
            controller: 'SettingsController as settings'
          }
        }
      })
  }
})()
