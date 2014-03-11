var Const = require('../common/common').Const;

TaskController = function(Task) {
    this.Task = Task;
};

TaskController.prototype.sendAllTasks = function (res) {
    return function (err) {
        if (err) res.send(err);
        this.Task.find({}, function (err, tasks) {
            if (err) { res.send(err) };
            res.json(tasks);
        }); 
    };
};

TaskController.prototype.read = function (req, res) {
    this.sendAllTasks(res).bind(this)(null);
};

TaskController.prototype.create = function (req, res) {
    var task = new this.Task(
        {
            content: req.body.content,
            owner: req.body.owner,
            due_date: req.body.due_date
        });
    task.save(this.sendAllTasks(res).bind(this));
};

TaskController.prototype.del = function (req, res) {
    this.Task.findByIdAndRemove(
        req.params[Const.TASK_ID_PARAM], 
        this.sendAllTasks(res).bind(this));
};

TaskController.prototype.update = function (req, res) {
    this.Task.findByIdAndUpdate(req.params[Const.TASK_ID_PARAM], req.body, this.sendAllTasks(res).bind(this));
};

exports.TaskController = TaskController;