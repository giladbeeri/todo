var request = require('supertest'),
    express = require('express'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Task = require('../../models/task'),
    should = require('should');

describe('/tasks', function () {
    var app;
    var taskId = new ObjectId('00112233445566778899AABB').toString();
    var defaultTasks = [
        { _id: taskId, content: 1 },
        { content: 2 }
    ];


    before(function (done) {
        app = express();
        require('../../routes/tasks')(app, Task);
        done();
    });

    beforeEach(function (done) {
        mongoose.connect('mongodb://localhost:27017/tasklist-test');
        mongoose.connection.on('error', function (err) {
            console.log(err);
        });
        mongoose.connection.once('connected', function () {
            mongoose.connection.db.dropDatabase(function () {
                Task.create(defaultTasks, done);
            });
        });
    });

    afterEach(function (done) {
        mongoose.connection.close(done);
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
        // Need to be greater than 1
        defaultTasks.should.not.have.length(0);
        defaultTasks.should.not.have.length(1);

        request(app)
            .del('/tasks/' + taskId.toString())
            .end(function (err, res) {
                res.body.should.have.length(defaultTasks.length - 1);
                res.body.forEach(function (task) {
                    task.should.not.have.property('_id', taskId);
                });
                done();
            });
    });
});