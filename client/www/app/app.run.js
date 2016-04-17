(function () {
  'use strict'

  angular
    .module('notesee')
    .run(run)

  function run ($rootScope, $state) {

    // Redirect to Landing Page if Authentication Fails
  	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
  		if (error === 'AUTH_REQUIRED') {
  			window.alert('Authentication Required')
  			$state.go('landing')
  		}
  	})

  	// Load Classrooms Page as Initial State
  	$state.go('tab.classrooms')
  }
})()
