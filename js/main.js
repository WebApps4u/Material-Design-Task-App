var app = angular.module("todo-app", ['ngMaterial', 'ng-mfb']);

app.directive("todoItem", function(){
    return{
        restrict: "E", //element directive
        templateUrl: "todo-item.html"
    };
});

//----------------------------------CONTROLLERS-----------------------------------------

//Main app controller
app.controller('AppCtrl', function($scope, $timeout, $mdDialog, $mdSidenav, $log, $mdMedia, $mdBottomSheet) {
    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle()
            .then(function(){
                $log.debug("toggle left is done");
            });
      };

      $scope.largeScreen = $mdMedia('gt-md');

      $scope.openLeft = function() {
          $mdSidenav('left').open().then(function(){
              $log.debug("open LEFT is done");
          });
      };

      $scope.closeLeft = function() {
          $mdSidenav('left').close().then(function(){
              $log.debug("close LEFT is done");
          });
      };
      //bottom sheet opener
      $scope.openSheet = function(){
          $mdBottomSheet.show({
              templateUrl: "bottom-sheet.html"
          });
      };

      $scope.openShareMenu = function(){
          $mdBottomSheet.show({
              templateUrl: "share-menu.html"
          });
      };

      $scope.settingsModal = function(){
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'edit-dialog.html',
            targetEvent: ev,
          });
      }

      $scope.click = function(){
          alert("clicked");
      }
});


app.controller("shareController", function($scope, $mdBottomSheet){

    $scope.shareItems = [
        {
            "name": "Facebook",
            "icon": "fa fa-facebook-square fa-3x"
        },
        {
            "name": "Twitter",
            "icon": "fa fa-twitter-square fa-3x"
        },
        {
            "name": "Instagram",
            "icon": "fa fa-instagram fa-3x"
        }
    ];

});

//List controller
app.controller("listController", function($scope){
    $scope.lists = [
        {
            "list_name" : "Personal",
            "list_icon" : "ion-plus-round"
        },
        {
            "list_name" : "School",
            "list_icon" : "ion-plus-round"
        },
        {
            "list_name" : "Work",
            "list_icon" : "ion-plus-round"
        },
    ];
});

//Todo Controller
app.controller('todoController', function($scope, $mdDialog, shareTasks){

    $scope.tasks = shareTasks.getTasks();

    $scope.remove = function( ev, idx ){

        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete the reminder?')
          .content('')
          .ariaLabel('Delete Reminder')
          .ok('Heck yes!')
          .cancel('Please, No!')
          .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            shareTasks.deleteTask(idx);
        });
    }

    $scope.newTask = function(ev){
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'new-dialog.html',
          targetEvent: ev,
        });

    }

    $scope.editTask = function(ev, idx) {
        //SET THE CURRENT INDEX TO A CERTAIN VALUE
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'edit-dialog.html',
        targetEvent: ev,
      });
    };

    function DialogController($scope, $mdDialog, shareTasks) {
        $scope.createNew = function(task){
            shareTasks.addTask(task);
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

});

app.service('shareTasks', function () {
        var tasks = [
            {
            "task_name": "Task 1",
            "task_subject": "History",
            "task_description": "Turn in the History Essay"
            },
            {
            "task_name": "Task 2",
            "task_subject": "Math",
            "task_description": "Study for the Math Midterm"
            },
            {
            "task_name": "Task 3",
            "task_subject": "Science",
            "task_description": "Fuck science in general"
            },
            {
            "task_name": "Task 4",
            "task_subject": "Art",
            "task_description": "Wait I'm not taking art..."
            }
        ];

        return {
            getTasks: function () {
                return tasks;
            },
            addTask: function(task) {
                tasks.push({
                    "task_name": task.task_name,
                    "task_subject": task.task_subject,
                    "task_description": task.task_description
                });
            },
            //NOT WORKING RIGHT NOW
            deleteTask: function(idx){
                tasks.splice( idx, 1 );
            },
            editTask: function(idx, task){
                tasks[idx] = {
                    "task_name": task.task_name,
                    "task_subject": task.task_subject,
                    "task_description": task.task_description
                }
            }
        };
    });
