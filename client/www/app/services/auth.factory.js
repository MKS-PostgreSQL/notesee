(function () {
  'use strict'

  angular
    .module('notesee')
    .factory('Auth', Auth)

  function Auth (AWS_URL, $http, $localStorage, $state) {
    return {
      current: function () {
        return {
          username: $localStorage.username,
          token: $localStorage.token
        }
      },

      signIn: function (username, password) {
        $http.post(AWS_URL + '/landing/login', {
          user: {
            username: username,
            password: password
          }
        }).success(function (data) {
          $localStorage.username = username
          $localStorage.token = data.token
          $http.defaults.headers.common['username'] = username
          $http.defaults.headers.common['token'] = data.token
          $state.go('tab.classrooms')
        })
      },

      signUp: function (username, password, email, name) {
        $http.post(AWS_URL + '/landing/register', {
          user: {
            username: username,
            password: password,
            email: email,
            name: name
          }
        }).success(function (data) {
          $localStorage.username = username
          $localStorage.token = data.token
          $http.defaults.headers.common['username'] = username
          $http.defaults.headers.common['token'] = data.token
          $state.go('tab.classrooms')
        })
      },

      signOut: function () {
        $localStorage.$reset()
        $state.go('landing')
      }
    }
  }
})()
