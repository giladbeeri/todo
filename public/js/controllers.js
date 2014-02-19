var todoControllers = angular.module('todoApp', []);

todoControllers.controller('TaskCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.tasks = $http.get('/todo/list').success(function(data) {
        $scope.tasks = data.tasks;
    });
    
    $scope.addTask = function(task) {
        $http.post("/todo", task).success(function(data) {
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
}]);
