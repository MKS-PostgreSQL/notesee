(function () {
  'use strict'

  angular
    .module('notesee.landing')
    .controller('LandingController', LandingController)

  function LandingController (Auth, $state) {
    var vm = this

    vm.signIn = signIn

    function signIn (provider) {

      // Try Authenticating with a Redirect
      Auth.$authWithOAuthRedirect(provider)
        .then(function (data) {
          $state.go('tab.classrooms')
        })

        // If Redirect Error
        .catch(function (error) {

          // Try Authenticating with a Popup Instead
          Auth.$authWithOAuthPopup(provider)
            .then(function (data) {
              $state.go('tab.classrooms')
            })
        })
    }
  }
})()
