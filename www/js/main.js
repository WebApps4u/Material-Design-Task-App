var app = angular.module("todo-app", ['ngMaterial', 'ng-mfb', "chats", "ngMdIcons"]);

app.directive("todoItem", function(){
    return{
        restrict: "E", //element directive
        templateUrl: "templates/todo-item.html"
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

      $scope.openLeft = function() {
          $mdSidenav('left').open()
              .then(function(){
                  $log.debug("toggle left is done");
              });
      };

      $scope.closeLeft = function() {
          $mdSidenav('left').close()
              .then(function(){
                  $log.debug("toggle left is done");
              });
      };

      //bottom sheet opener
      $scope.openSheet = function(){
          $mdBottomSheet.show({
              templateUrl: "templates/bottom-sheet.html"
          });
      };

      $scope.openShareMenu = function(){
          $mdBottomSheet.show({
              templateUrl: "templates/share-menu.html"
          });
      };

      $scope.settingsModal = function(){
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/edit-dialog.html',
            targetEvent: ev,
          });
      }

      $scope.click = function(){
          //routing needs to be implemented here
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

//sideNav Controller
app.controller("sideNavController", function($scope, $mdDialog){
    $scope.topMenu = [
        {
            "name" : "Personal",
            "icon" : "dashboard"
        },
        {
            "name" : "School",
            "icon" : "group"
        },
        {
            "name" : "Work",
            "icom" : "message"
        },
    ];

    $scope.secondMenu = [
        {
            "name" : "Personal",
            "icon" : "dashboard"
        }
    ];

    $scope.showSettings = function(ev){
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'templates/settings.html',
          targetEvent: ev,
        });

    }

    function DialogController($scope, $mdDialog) {
        $scope.saveChanges = function(idx){
            //change the settings
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

//Todo Controller
app.controller('todoController', function($scope, $mdDialog, shareTasks){

    $scope.tasks = shareTasks.getTasks();
    $scope.changeStar = function(starred){
        if (starred){
            return "#FFEB3B";
        }else{
            return "#9E9E9E";
        }
    }
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
          templateUrl: 'templates/new-dialog.html',
          targetEvent: ev,
        });

    }

    $scope.editTask = function(ev, idx) {
        //SET THE CURRENT INDEX TO A CERTAIN VALUE
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/edit-dialog.html',
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
            "task_name": "Material Editor",
            "task_subject": "History",
            "task_description": "",
            "sub_tasks": [
                "Add a file-structure sidebar",
                "Find a way to access _ace in the .run function",
                "Add ability to open/close files",
                "Add functionality to tabs with ui-route"
            ]
            },
            {
            "task_name": "Material Todo",
            "task_subject": "Math",
            "task_description": "",
            "sub_tasks": [
                "Add functionality to tabs with ui-route",
                "Add functionality to sideBar with ui-route",
                "Add functionality to floating nav",
                "Resolve reponsiveness issue with sidebar",
                "Add persistent data by linking with AngularFire",
                "Make tasks input using md-chips"
            ]
            },
            {
            "task_name": "Material Writer",
            "task_subject": "Science",
            "task_description": "Screw science in general",
            "sub_tasks": [
                "Create the application, for starters"
            ]
            },
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
