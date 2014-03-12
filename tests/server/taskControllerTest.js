var Const = require('../../config/common').Const;
var Task = require('../../models/task'),
    taskCtrl = require('../../controllers/task')(Task);
var httpMocks = require('node-mocks-http');
var should = require('should'),
    sinon = require('sinon');

describe('Task Ctrl', function() {
    var defaultTasks = [
        {_id: 1, content: "Complete this project", owner: "John Doe", isCompleted: false, due_date: new Date(2014, 3, 1) },
        {_id: 2, content: "Finish your homework", owner: "John Doe", isCompleted: false, due_date: new Date(2014, 2, 28) },
        {_id: 3, content: "Go to sleep", owner: "John Doe", isCompleted: false, due_date: new Date() }
    ];
    var req, res, TaskMock;
    /*var Task = {
        tasks: [],
        
        saveTasks: function(tasks, cb) {
            if (typeof(tasks.length) == "undefined")
                tasks = [tasks];
            this.tasks = this.tasks.concat(tasks);
            if (cb !== undefined) {
                cb(null);
            }
        },
        findAll: function(cb) { cb(null, this.tasks); },
        remove: function(id, cb) {
            tasks = this.tasks;
            this.tasks.forEach(function (task, index, arr) {
                if (task._id !== id) {
                    tasks.push(task);
                }
            });
            this.tasks = tasks;
        }
    };*/
    
    beforeEach(function() {
        res = httpMocks.createResponse();
        req = httpMocks.createRequest();

        TaskMock = sinon.mock(Task);
        var findExpectation = TaskMock.expects('find');
        // Check Task.find is called without conditions, and only once.
        findExpectation.once().withArgs({});
        // Call the callback with (null, defaultTasks)
        findExpectation.callsArgWith(1, null, defaultTasks);
    });
    
    it('should read all tasks', function () {
        taskCtrl.read(null, res);
        var data = JSON.parse(res._getData());
        data.should.have.length(defaultTasks.length);

        TaskMock.verify();
    });
    /*
    it('should create a new task', function () {
        req.body = {
            content: "HI",
            owner: "ME",
            due_date: new Date(0)
        };
        taskCtrl.create(req, res);
        var data = JSON.parse(res._getData());
        data.should.have.length(1);
        data[0].content.should.equal('HI');
        data[0].owner.should.equal('ME');
        TaskMock.verify();
    });

    it('should remove a task', function () {
        req.params[Const.TASK_ID_PARAM] = 1;
        
    });*/
});
