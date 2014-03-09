var Const = require('../../common/common').Const;
var Tasks = require('../../routes/tasks').Tasks;
var httpMocks = require('node-mocks-http');

describe('Task Router', function() {
    defaultTasks = [
        {_id: 1, content: "Complete this project", owner: "John Doe", isCompleted: false, due_date: new Date(2014, 3, 1) },
        {_id: 2, content: "Finish your homework", owner: "John Doe", isCompleted: false, due_date: new Date(2014, 2, 28) },
        {_id: 3, content: "Go to sleep", owner: "John Doe", isCompleted: false, due_date: new Date() }
    ];
    var taskRouter, req, res;
    var Task = {
        tasks: [],
        
        save: function(tasks, cb) {
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
        },
    };
    
    beforeEach(function() {
        res = httpMocks.createResponse();
        req = httpMocks.createRequest();
        Task.tasks = [];
        Task.save(defaultTasks);
        taskRouter = new Tasks();
    });
    
    it('should read all tasks', function () {
        taskRouter.read(Task)(null, res);
        var data = JSON.parse(res._getData());
        expect(data.length).toEqual(defaultTasks.length);
    });
    
    it('should create new tasks', function () {
        req.body = {
            content: "HI",
            owner: "ME",
            due_date: new Date(0)
        };
        taskRouter.create(Task)(req, res);
        var data = JSON.parse(res._getData());
        expect(data.length).toEqual(defaultTasks.length + 1);
        expect(data[defaultTasks.length].content).toEqual("HI");
        expect(data[defaultTasks.length].owner).toEqual("ME");
    });
    
    it('should remove a task', function () {
        req.params[Const.TASK_ID_PARAM] = 1;
        
    });
});
