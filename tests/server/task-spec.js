var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tasklist-test');

describe('Task model', function () {
    beforeEach(function () {
        mongoose.connection.db.dropDatabase();
    });

    it('should remove task by ID', function () {

    });
});