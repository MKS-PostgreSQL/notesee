(function () {
  'use strict'

  angular
    .module('notesee')
    .run(run)

  function run (Auth, $http, $ionicPlatform, $state) {
    // Configure Ionic Platform
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        cordova.plugins.Keyboard.disableScroll(true)
      }

      if (window.StatusBar) {
        StatusBar.styleDefault()
      }
    })

    // Set Headers & Load Classrooms Page If Logged In
    if (Auth.current().token) {
      // Append Authentication Information to Each HTTP Request
      $http.defaults.headers.common['username'] = Auth.current().username
      $http.defaults.headers.common['token'] = Auth.current().token

      // Go To Classrooms Page
      $state.go('tab.classrooms')
    } else {
      // Otherwise Go To Landing Page
      $state.go('landing')
    }
  }
})()
