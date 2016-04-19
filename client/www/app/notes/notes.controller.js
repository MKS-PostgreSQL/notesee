(function () {
  'use strict'

  angular
    .module('notesee.notes')
    .controller('NotesController', NotesController)

  function NotesController (Auth, Notes, $cordovaCamera, $ionicModal, $scope, $stateParams) {
    // Initialization
    var vm = this
    activate()

    // Variables
    vm.author = Auth.current().username
    vm.classroom = $stateParams.classroom
    vm.modal
    vm.newPhoto
    vm.notes = []
    vm.query
    vm.tags

    // Functions
    vm.create = create
    vm.save = save
    vm.selectPhoto = selectPhoto
    vm.takePhoto = takePhoto
    vm.upload = upload

    // Implementation Details
    function activate () {
      Notes.for(vm.classroom).success(function (data) {
        vm.notes = data.map(function (note) {
          note.tags = note.tags.split(' ')
          return note
        })
      })
    }

    function create () {
      $ionicModal.fromTemplateUrl('app/notes/new.html', {scope: $scope})
        .then(function (modal) {
          vm.modal = modal
          vm.modal.show()
        })
    }

    function save (note) {
      Notes.save(note)
    }

    function selectPhoto () {
      $cordovaCamera.getPicture({destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY, quality: 75})
        .then(function (image) {
          vm.newPhoto = image
        })
    }

    function takePhoto () {
      $cordovaCamera.getPicture({destinationType: Camera.DestinationType.DATA_URL, quality: 75})
        .then(function (image) {
          vm.newPhoto = image
        })
    }

    function upload () {
      Notes.create(vm.author, vm.classroom, vm.newPhoto, vm.tags).success(function (data) {
        vm.newPhoto = null
        vm.tags = null
      })

      vm.modal.remove()
      activate()
    }
  }
})()
