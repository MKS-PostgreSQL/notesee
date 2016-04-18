(function () {
  'use strict'

  angular
    .module('notesee.settings')
    .controller('SettingsController', SettingsController)

  function SettingsController ($state) {
    var vm = this

    vm.signOut = signOut

    function signOut () {
      $state.go('landing')
    }
  }
})()
