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
}]);
