'use strict';

/* jasmine specs for controllers go here */

describe('TodoList controllers', function() {
    var scope, ctrl;
    
    beforeEach(module('todoControllers'));
    beforeEach(inject(function($controller) {
        scope = {};
        ctrl = $controller('TaskCtrl', { $scope: scope});
    }));
    
    describe('TaskCtrl', function() {
        
        it('should have default reverse order of false', function() {
            expect(scope.reverseOrder).toBeFalsy();
        });
        
        it('should sort table by new predicate with false reverse order', function() {
            scope.sortTable('predicate1');
            scope.sortTable('predicate2');
            expect(scope.reverseOrder).toBeFalsy();
        });
        
        it('should sort table by reverse order if same predicate passed', function() {
            scope.sortTable('predicate1');
            scope.sortTable('predicate1');
            expect(scope.reverseOrder).toBeTruthy();
        });
    });
});

