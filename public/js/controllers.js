var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('TaskCtrl', 
    ['$scope', '$http', 'config', function($scope, $http, config) {
    $scope.tasks = $http.get(config.taskListUrl).success(function(tasks) {
        $scope.tasks = tasks;
    });
    
    $scope.addTask = function(task) {
        $http.post(config.taskListUrl, task).success(function(data) {
            $scope.tasks = data;
        });
    };
    
    $scope.deleteTask = function(taskId) {
        console.log("Angular: delete task #" + taskId);
        // Possible to remove the task from the current array, instead of reading the data from the server again.
        // It would be faster, but less reliable in a multi-client environment.
        $http.delete(config.taskListUrl + taskId).success(function(data) {
            $scope.tasks = data;
        });  
    };
    
    $scope.toggleTask = function(task) {
        console.log("Angular: Toggle task #" + task._id);
        $http.put(config.taskListUrl + task._id, {done: !task.done}).success(function(data) {
            $scope.tasks = data;
        }).error(function(data) {
            console.log("Failed updating task #" + task._id);
        });  
    };
    
    $scope.updateTask = function(task, data) {
        console.log("Updating task with data: ", data);
        console.log(task);
        $http.put(config.taskListUrl + task._id, { owner: data }).success(function(data) {
            $scope.tasks = data;
        }).error(function(data) {
            console.log("Failed updating task #" + task._id);
        });  
    };
    
    $scope.reverseOrder = false;
    $scope.predicate = 'due_date';
    $scope.sortTable = function(predicate) {
        if (predicate === $scope.predicate) {
            $scope.reverseOrder = !$scope.reverseOrder;    
        } else {
            $scope.reverseOrder = false;
            $scope.predicate = predicate;  
        }
                
        console.log("Sort by " + predicate + ", reverse: " + $scope.reverseOrder);
    };
    
    $scope.colorTask = function(task) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        dueDate = new Date(task.due_date);
        dueDate.setHours(0, 0, 0, 0);
        var upcomingDate = new Date();
        upcomingDate.setDate(upcomingDate.getDate() + 2); // 2 days timeframe
        upcomingDate.setHours(0, 0, 0, 0); 

        // Use Bootstrap 'warning' and 'danger' class as classes for late and upcoming tasks.
        var cls = "";
        if (task.done) {
            cls = "success";
        } else {
            if (today > dueDate) {
                cls = "danger";
            } else if (upcomingDate > dueDate) {
                cls = "warning";
            }
        } 
        return cls;
    };
    
    $scope.getToday = function() {
        return getToday();
    };
}]);
