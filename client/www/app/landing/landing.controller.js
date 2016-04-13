(function () {
  'use strict'

  angular
    .module('notesee.landing')
    .controller('LandingController', LandingController)

  function LandingController ($state) {
    var vm = this

    vm.signIn = signIn

    function signIn () {
      // does something that retreives user_id
      var user_id = 8;
      $state.go('tab.classrooms', {user: user_id})
    }

  }
})()
