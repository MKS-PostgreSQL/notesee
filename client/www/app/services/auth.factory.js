(function () {
  'use strict'

  angular
    .module('notesee')
    .factory('Auth', Auth)

  function Auth (FIREBASE_URL, $firebaseAuth) {
    return $firebaseAuth(new Firebase(FIREBASE_URL + '/users'))
  }
})()
