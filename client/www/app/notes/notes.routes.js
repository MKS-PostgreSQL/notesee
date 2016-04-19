(function () {
  'use strict'

  angular
    .module('notesee.notes')
    .config(config)

  function config ($stateProvider) {
    $stateProvider
      .state('tab.notes', {
        url: '/notes/:classroom',
        views: {
          'tab-classrooms': {
            templateUrl: 'app/notes/notes.html',
            controller: 'NotesController as notes'
          }
        }
      })
  }
})()
