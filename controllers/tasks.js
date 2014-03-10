var Const = require('../common/common').Const;

TaskController = function(Task) {
    this.Task = Task;
};

TaskController.prototype.sendAllTasks = function (res) {
    return function (err) {
        if (err) res.send(err);
        this.Task.findAll(function (err, tasks) {
            if (err) res.send(err);
            res.json(tasks);
        }); 
    };
};

TaskController.prototype.read = function (req, res) {
    this.sendAllTasks(res).bind(this)(null);
};

TaskController.prototype.create = function (req, res) {
    this.Task.save({
        content: req.body.content,
        isCompleted: false,
        owner: req.body.owner,
        due_date: req.body.due_date
    }, this.sendAllTasks(res).bind(this));
};

TaskController.prototype.del = function (req, res) {
    this.Task.del(
        req.params[Const.TASK_ID_PARAM], 
        this.sendAllTasks(res).bind(this));
};

TaskController.prototype.update = function (req, res) {
    this.Task.update(req.params[Const.TASK_ID_PARAM], req.body, this.sendAllTasks(res).bind(this));
};

exports.TaskController = TaskController;