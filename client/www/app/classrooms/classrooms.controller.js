(function () {
  'use strict'

  angular
    .module('notesee.classrooms')
    .controller('ClassroomsController', ClassroomsController)

  function ClassroomsController (Auth, Rooms, $cordovaSocialSharing, $ionicModal, $state) {
    // Initialization
    var vm = this
    activate()

    // Variables
    vm.joining
    vm.username = Auth.current().username
    vm.rooms = []

    // Functions
    vm.create = create
    vm.join = join
    vm.leave = leave
    vm.share = share

    // Implementation Details
    function activate () {
      Rooms.joined(vm.username).success(function (data) {
        vm.rooms = data
      })
    }

    function create () {
      var roomName = window.prompt('What would you like to name your classroom?')

      Rooms.create(roomName).success(function (data) {
        $cordovaSocialSharing
          .share(vm.username + ' has invited you to join the ' + roomName + ' classroom! Enter ' + data.code + ' in the app to collaborate on notes.', roomName + ' Classroom Invitation', null, 'http://notesee.com')

        activate()
      })
    }

    function join () {
      var code = window.prompt('Enter Classroom Code')

      Rooms.join(vm.joining, code, vm.username).success(function (data) {
        vm.joining = null
        activate()
      })
    }

    function leave (classroom) {
      Rooms.leave(classroom, vm.username).success(function (data) {
        activate()
      })
    }

    function share (classroom) {
      $cordovaSocialSharing
        .share(vm.username + ' has invited you to join the ' + classroom.className + ' classroom! Enter ' + classroom.code + ' in the app to collaborate on notes.', classroom.className + ' Classroom Invitation', null, 'http://notesee.com')
    }
  }
})()
