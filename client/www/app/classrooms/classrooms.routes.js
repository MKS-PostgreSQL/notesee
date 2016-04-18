(function () {
  'use strict'

  angular
    .module('notesee.classrooms')
    .config(config)

  function config ($stateProvider) {
    $stateProvider
      .state('tab.classrooms', {
        url: '/classrooms',
        views: {
          'tab-classrooms': {
            templateUrl: 'app/classrooms/classrooms.html',
            controller: 'ClassroomsController as classrooms'
          }
        }
      })
  }
})()
