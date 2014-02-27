'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));


  it('should ....', inject(function() {
    //spec body
  }));

  it('should ....', inject(function() {
    //spec body
  }));
});

describe('TodoList controllers', function() {
    beforeEach(module('todoApp'));
    
    describe('TaskCtrl', function() {
        
        it('should have default reverse order of false', inject(function($controller) {
            var scope = {}, ctrl = $controller('TaskCtrl', { $scope: scope});
            
            expect(scope.reverseOrder).toBe(false);
        }));
    });
});

