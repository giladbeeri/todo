var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;
var Task = require('../../models/Task');

describe('Task model', function () {
    var conn;
    var taskId = new ObjectId();
    var defaultTasks = [{ _id: taskId, content: 1 }, { content: 2 }];

    beforeEach(function (done) {
        /*
        console.log('NODE_ENV: ' + process.env.NODE_ENV);
        if (process.env.NODE_ENV !== 'test') {
            console.log('Sorry, doesn\'t seem like a test env :(');
            process.exit(1);
        }
        */
        conn = mongoose.createConnection('mongodb://localhost:27017/tasklist-test', function () {
            console.log("A");
            conn.db.dropDatabase(function () {
                console.log("B");
                Task.create(defaultTasks, function () {
                    console.log("C");
                    done();
                });
            });
        });
        conn.on('error', function (err) {
            console.log(err);
        });
        /*conn.once('open', function () {
            conn.db.dropDatabase(function () {
                Task.create(defaultTasks, done);
            });*/
    });

    afterEach(function (done) {
        conn.close(done);
    });

    it('should save and return all tasks', function (done) {
        Task.create(defaultTasks, function () {
            Task.find({}, function (err, tasks) {
                tasks.should.have.length(defaultTasks.length);
                tasks[0].should.have.property('content', 1);
                tasks[1].should.have.property('content', 2);
                done();
            });
        });
    });
/*
    it('should remove task by ID', function (done) {
        Task.create(defaultTasks, function (err) {
            Task.findByIdAndRemove(taskId.toString(), function () {
                Task.find({}, function (err, tasks) {
                    tasks.should.have.length(defaultTasks.length - 1);
                    tasks[0].should.have.property('content', 2);
                    done();
                });
            });
        });
    });

    it('should update task with new data', function (done) {
        Task.create(defaultTasks, function (err) {
            Task.findByIdAndUpdate(taskId.toString(), { content: 3 }, function () {
                Task.find({}, function (err, tasks) {
                    tasks.should.have.length(defaultTasks.length);
                    tasks[0].should.have.property('content', 3);
                    // Other tasks aren't changed
                    tasks[1].should.have.property('content', 2);
                    done();
                });
            });
        });
    });
*/
    xit('should toggle task from false to true', function (done) {
        Task.create(defaultTasks, function (err) {
            Task.toggleTask.bind(Task)(taskId.toString(), function () {
                Task.find({}, function (err, tasks) {
                    tasks[0].should.have.property('done', true);
                    done();
                });
            });
        });
    });
});