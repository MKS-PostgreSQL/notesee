(function () {
  'use strict'

  angular
    .module('notesee.landing')
    .controller('LandingController', LandingController)

  function LandingController (Auth, $state) {
    // Initialization
    var vm = this

    // Variables
    vm.account = {
      name: '',
      email: '',
      username: '',
      password: ''
    }

    // Functions
    vm.signIn = signIn
    vm.signUp = signUp

    // Implementation Details
    function signIn () {
      Auth.signIn(vm.account.username, vm.account.password)
    }

    function signUp () {
      Auth.signUp(vm.account.username, vm.account.password, vm.account.email, vm.account.name)
    }
  }
})()
