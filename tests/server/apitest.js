var request = require('supertest'),
    express = require('express'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Task = require('../../models/task'),
    should = require('should');

describe('/tasks', function () {
    var conn, app;
    var taskId = new ObjectId('00112233445566778899AABB');
    var defaultTasks = [
        { _id: taskId.toString(), content: 1 },
        { content: 2 }
    ];

    before(function (done) {
        app = express();
        require('../../routes/tasks')(app, Task);
        done();
    });

    beforeEach(function (done) {
        conn = mongoose.createConnection('mongodb://localhost:27017/tasklist-test');
        conn.on('error', function (err) {
            console.log(err);
        });
        conn.on('open', function () {
            conn.db.dropDatabase(function () {
                Task.saveTasks(defaultTasks, function () {
                    done();
                });
            });
        });

    });

    afterEach(function (done) {
        conn.close(done);
    });

    it('should be indifferent to ending slashes', function (done) {
        request(app)
            .get('/tasks')
            .end(function (err, res1) {
                if (err) { return done(err); }
                request(app)
                    .get('/tasks/')
                    .end(function (err, res2) {
                        if (err) { return done(err); }
                        res1.should.have.status(200);
                        res2.should.have.status(200);
                        res1.text.should.eql(res2.text);
                        done();
                    });
            });
    });

    it('GET should return all tasks', function (done) {
        request(app)
            .get('/tasks/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) { return done(err); }
                res.body.should.have.length(defaultTasks.length);
                done();
            });
    });

    it('DELETE should delete only one task', function (done) {
        defaultTasks.should.have.length(2); // Need to be greater than 1
        request(app)
            .del('/tasks/' + taskId.toString())
            .end(function (err, res) {
                res.body.should.have.length(defaultTasks.length - 1);
                done();
            });
    });
});