(function () {
  'use strict'

  angular
    .module('notesee.saved')
    .controller('SavedController', SavedController)

  function SavedController (Auth, Notes) {
    // Initialization
    var vm = this
    activate()

    // Variables
    vm.notes = []

    // Functions

    // Implementation Details
    function activate () {
      Notes.saved(Auth.current().username).success(function (data) {
        vm.notes = data
      })
    }
  }
})()
