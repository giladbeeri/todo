var todoModule = angular.module('todoApp', []);

todoApp.controller('TaskCtrl', ['$scope', function($scope) {
    $scope.todos = [];
}]);
