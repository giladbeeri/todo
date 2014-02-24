var todoControllers = angular.module('todoApp', []);

todoControllers.controller('TaskCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.tasks = $http.get('/todo/list').success(function(tasks) {
        $scope.tasks = tasks;
    });
    
    $scope.addTask = function(task) {
        $http.post('/todo', task).success(function(data) {
            $scope.tasks = data;
        });
    };
    
    $scope.deleteTask = function(taskId) {
        console.log("Angular: delete task #" + taskId);
        // Possible to remove the task from the current array, instead of reading the data from the server again.
        // It would be faster, but less reliable in a multi-client environment.
        $http.delete('/todo/' + taskId).success(function(data) {
            $scope.tasks = data;
        });  
    };
    
    $scope.toggleTask = function(taskId) {
        console.log("Angular: Toggle task #" + taskId);
        $http.put('/todo/' + taskId).success(function(data) {
            $scope.tasks = data;
        }).error(function(data) {
            console.log("Failed updating task #" + taskId);
        });  
    };
    
    $scope.reverseOrder = false;
    $scope.predicate = 'due_date';
    $scope.sortTable = function(predicate) {
        $scope.reverseOrder = !$scope.reverseOrder;
        $scope.predicate = predicate;  
    };
    
    $scope.colorByDueDate = function(dueDateStr) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        dueDate = new Date(dueDateStr);
        dueDate.setHours(0, 0, 0, 0);
        var upcomingDate = new Date();
        upcomingDate.setDate(upcomingDate.getDate() + 2); // 2 days timeframe
        upcomingDate.setHours(0, 0, 0, 0); 

        // Use Bootstrap 'warning' and 'danger' class as classes for late and upcoming tasks.
        var cls = "";
        if (today > dueDate) {
            cls = "danger";
        } else if (upcomingDate > dueDate) {
            cls = "warning";
        } else {
            cls = "farTask";
        }
        
        return cls;
    };
}]);
