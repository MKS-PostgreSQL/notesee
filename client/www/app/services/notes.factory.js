(function () {
  'use strict'

  angular
    .module('notesee')
    .factory('Notes', Notes)

  function Notes (AWS_URL, $http) {
    return {
      for: function (classroom) {
        return $http.get(AWS_URL + '/classrooms/classroom/' + classroom + '/notes')
      },

      save: function (note) {
        $http.post(AWS_URL + '/classrooms/notes/save', {
          notes: {
            noteId: note
          }
        })
      },

      saved: function (user) {
        return $http.get(AWS_URL + '/users/user/' + user + '/saved')
      },

      create: function (author, classroom, attachment, tags) {
        return $http.post(AWS_URL + '/classrooms/notes', {
          user: {
            username: author
          },
          classroom: {
            className: classroom
          },
          attachment: {
            base64: attachment
          },
          tags: {
            name: tags
          }
        })
      }
    }
  }
})()
