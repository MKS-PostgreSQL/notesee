(function () {
  'use strict'

  angular
    .module('notesee')
    .factory('Rooms', Rooms)

  function Rooms (AWS_URL, $http) {
    return {
      create: function (room) {
        return $http.post(AWS_URL + '/classrooms', {
          classroom: {
            className: room
          },
          user: {
            username: 'merktassel'
          }
        })
      },

      all: function() {
        return $http.get(AWS_URL + '/classrooms')
      },

      joined: function (user) {
        return $http.get(AWS_URL + '/users/user/' + user + '/classrooms')
      },

      join: function (room, code, username) {
        return $http.post(AWS_URL + '/classrooms/classroom/adduser', {
          classroom: {
            className: room,
            code: code
          },
          user: {
            username: username
          }
        })
      },

      leave: function (room, username) {
        return $http.post(AWS_URL + '/classrooms/classroom/removeuser', {
          classroom: {
            className: room
          },
          user: {
            username: username
          }
        })
      }
    }
  }
})()
