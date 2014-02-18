var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('TaskCtrl', ['$scope', function($scope) {
    $scope.todos = [];
}]);
