(function () {
  'use strict'

  angular
    .module('notesee.classrooms')
    .controller('ClassroomsController', ClassroomsController)

  function ClassroomsController ($cordovaSocialSharing, $ionicModal, $scope, $state, Rooms) {
    var vm = this
    var userId = $state.params.user

    vm.start = start
    vm.create = create
    vm.leave = leave
    vm.view = view

    function start () {
      Rooms.getClassrooms(userId).then(function (response) {
        vm.rooms = response.data;
      }, function (err) {
        console.log(err);
      })
    }

    function create () {
      var roomName = window.prompt('What would you like to name your classroom?')

      $cordovaSocialSharing
        .share('Mark has invited you to join the ' + roomName + ' classroom! Enter 1234 in the app to collaborate on notes.', roomName + ' Classroom Invitation', null, 'http://example.com')
    }

    function leave () {
      console.log('should leave the room')
    }

    function view () {
      $state.go('tab.notes')
    }
  }
})()
