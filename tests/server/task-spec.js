var mongoose = require('mongoose');

describe('Task model', function () {
    mongoose.connect('mongodb://localhost:27017/tasklist-test');
    var conn = mongoose.connection;
    conn.on('error', function (err) {
        console.log(err);
    });

    before(function (done) {
        /*
        console.log('NODE_ENV: ' + process.env.NODE_ENV);
        if (process.env.NODE_ENV !== 'test') {
            console.log('Sorry, doesn\'t seem like a test env :(');
            process.exit(1);
        }
        */
        done();
    });

    after(function (done) {
        conn.db.dropDatabase(function () {
            conn.close(done);
        });
    });

    beforeEach(function () {
    });

    it('should remove task by ID', function () {

    });
});