var todoControllers = angular.module('todoApp', []);

todoControllers.controller('TaskCtrl', ['$scope', function($scope) {
    $scope.todos = [];
}]);
