(function () {
  'use strict'

  angular
    .module('notesee.settings')
    .controller('SettingsController', SettingsController)

  function SettingsController (Auth, $state) {
    var vm = this

    vm.signOut = signOut

    function signOut () {
      Auth.$unauth()
      $state.go('landing')
    }
  }
})()
