var todoControllers = angular.module('todoApp', []);

todoControllers.controller('TaskCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.tasks = $http.get('/todo/ang').success(function(data) {
        $scope.tasks = data.tasks;
        console.log(data);
    });
}]);
