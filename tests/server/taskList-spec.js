var Const = require('../../common/common').Const;
var TaskController = require('../../controllers/tasks').TaskController;
var httpMocks = require('node-mocks-http');
var should = require('should');

describe('Task Ctrl', function() {
    var defaultTasks = [
        {_id: 1, content: "Complete this project", owner: "John Doe", isCompleted: false, due_date: new Date(2014, 3, 1) },
        {_id: 2, content: "Finish your homework", owner: "John Doe", isCompleted: false, due_date: new Date(2014, 2, 28) },
        {_id: 3, content: "Go to sleep", owner: "John Doe", isCompleted: false, due_date: new Date() }
    ];
    var taskCtrl, req, res;
    var Task = {
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
    };
    
    beforeEach(function() {
        res = httpMocks.createResponse();
        req = httpMocks.createRequest();
        Task.tasks = [];
        Task.saveTasks(defaultTasks);
        taskCtrl = new TaskController(Task);
    });
    
    it('should read all tasks', function () {
        taskCtrl.read(null, res);
        var data = JSON.parse(res._getData());
        data.should.have.length(defaultTasks.length);
    });
    
    it('should create new tasks', function () {
        req.body = {
            content: "HI",
            owner: "ME",
            due_date: new Date(0)
        };
        taskCtrl.create(req, res);
        var data = JSON.parse(res._getData());
        data.should.have.length(defaultTasks.length + 1);
        data[defaultTasks.length].content.should.equal('HI');
        data[defaultTasks.length].owner.should.equal('ME');
    });
    
    it('should remove a task', function () {
        req.params[Const.TASK_ID_PARAM] = 1;
        
    });
});
