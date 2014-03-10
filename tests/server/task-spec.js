var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;
var Task = require('../../models/Task');

describe('Task model', function () {
    mongoose.connect('mongodb://localhost:27017/tasklist-test');
    var conn = mongoose.connection;
    conn.on('error', function (err) {
        console.log(err);
    });
    var taskId = new ObjectId();
    var defaultTasks = [{ _id: taskId, content: 1 }, { content: 2 }];

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

    afterEach(function (done) {
        // better in beforeEach,
        // but throws "Error: Cannot determine state of server" for some reason.
        conn.db.dropDatabase(done);
    });

    it('should save and return all tasks', function (done) {
        Task.save(defaultTasks, function () {
            Task.findAll(function (err, tasks) {
                tasks.should.have.length(defaultTasks.length);
                tasks[0].should.have.property('content', 1);
                tasks[1].should.have.property('content', 2);
                done();
            });
        });
    });

    it('should remove task by ID', function (done) {
        Task.save(defaultTasks, function (err) {
            Task.del(taskId.toString(), function () {
                Task.findAll(function (err, tasks) {
                    tasks.should.have.length(defaultTasks.length - 1);
                    tasks[0].should.have.property('content', 2);
                    done();
                });
            });
        });
    });

    it('should update task with new data', function (done) {
        Task.save(defaultTasks, function (err) {
            Task.update(taskId.toString(), { content: 3 }, function () {
                Task.findAll(function (err, tasks) {
                    tasks.should.have.length(defaultTasks.length);
                    tasks[0].should.have.property('content', 3);
                    // Other tasks aren't changed
                    tasks[1].should.have.property('content', 2);
                    done();
                });
            });
        });
    });

    xit('should toggle task from false to true', function (done) {
        Task.save(defaultTasks, function (err) {
            Task.toggleTask.bind(Task)(taskId.toString(), function () {
                Task.findAll(function (err, tasks) {
                    tasks[0].should.have.property('done', true);
                    done();
                });
            });
        });
    });
});