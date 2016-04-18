(function () {
  'use strict'

  angular
    .module('notesee')
    .run(run)

  function run ($state) {

  	// Load Classrooms Page as Initial State
  	$state.go('tab.classrooms')
  }
})()
