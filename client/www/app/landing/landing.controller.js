(function () {
  'use strict'

  angular
    .module('notesee.landing')
    .controller('LandingController', LandingController)

  function LandingController ($state) {
    var vm = this

    vm.signIn = signIn

    function signIn () {
    }
  }
})()
