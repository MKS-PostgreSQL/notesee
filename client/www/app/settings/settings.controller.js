(function () {
  'use strict'

  angular
    .module('notesee.settings')
    .controller('SettingsController', SettingsController)

  function SettingsController (Auth, $state) {
    // Initialization
    var vm = this

    // Variables

    // Functions
    vm.signOut = signOut

    // Implementation Details
    function signOut () {
      Auth.signOut()
    }
  }
})()
