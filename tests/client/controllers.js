describe('TodoList controllers', function() {
    beforeEach(module('todoApp'));
    
    describe('TaskCtrl', function() {
        
        it('should have default reverse order of false', inject(function($controller) {
            var scope = {}, ctrl = $controller('TaskCtrl', { $scope: scope});
            
            expect(scope.reverseOrder).toBe(false);
        }));
    });
});
