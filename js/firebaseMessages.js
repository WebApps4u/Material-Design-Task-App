var fireModule = angular.module("chats", ["firebase"]);

fireModule.factory("chatMessages", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the Firebase where we will store our data
    var randomRoomId = Math.round(Math.random() * 100000000);
    var ref = new Firebase("https://torrid-inferno-3143.firebaseio.com/" + randomRoomId);

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

fireModule.controller("ChatCtrl", ["$scope", "chatMessages",

  // we pass our new chatMessages factory into the controller
  function($scope, chatMessages) {

      $scope.newTask = function(ev){
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/firebase-dialog.html',
            targetEvent: ev,
          });

      }

      function DialogController($scope, $mdDialog, chatMessages) {
          $scope.createNew = function(task){
              $mdDialog.hide();
          }
          $scope.saveChanges = function(idx, task){
              shareTasks.editTask(idx, task);
              $mdDialog.hide();
          }
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
      };


    $scope.messages = chatMessages;

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function(task_name, task_subject, task_description) {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to Firebase!
      $scope.messages.$add({
          task_name: task_name,
          task_subject: task_subject,
          task_description: task_description
      });

      // reset the message input
      $scope.message = "";
    };

    // if the messages are empty, add something for fun!
    $scope.messages.$loaded(function() {
      if ($scope.messages.length === 0) {
        $scope.messages.$add({
            task_name: "New Task",
            task_subject: 'Science',
            task_description: "A task"
        });
      }
    });
  }
]);
