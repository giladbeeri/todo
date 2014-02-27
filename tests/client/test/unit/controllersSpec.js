'use strict';

/* jasmine specs for controllers go here */

describe('TodoList controllers', function() {
    beforeEach(module('todoControllers'));
    
    describe('TaskCtrl', function() {
        
        it('should have default reverse order of false', inject(function($controller) {
            var scope = {}, ctrl = $controller('TaskCtrl', { $scope: scope});
            
            expect(scope.reverseOrder).toBe(false);
        }));
    });
});

