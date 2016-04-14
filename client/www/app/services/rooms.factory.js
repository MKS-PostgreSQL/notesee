(function () {
  'use strict'

  angular
    .module('notesee')
    .factory('Rooms', Rooms)

  function Rooms ($http) {
    //----- Mock Data ------
    // return [
    //   {name: 'MKS35'},
    //   {name: 'HR2'}
    // ]

    // retrieve all classroom names for specific user
    var classRoom = {}
    classRoom.getClassrooms = getClassrooms

    function getClassrooms (userId) {
      return $http.get('http://localhost:8080/api/users/user/' + userId + '/classrooms')
    }

    return classRoom
  }
})()
