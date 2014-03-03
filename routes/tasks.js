var Const = require('../common/common').Const;

Tasks = function(taskProvider) {
    this.taskProvider = taskProvider;
};

Tasks.prototype.sendAllTasks = function(res) {
    return function(err) {
        if (err) res.send(err);
        this.taskProvider.findAll(function(err, tasks) {
            if (err) res.send(err);
            res.json(tasks); 
        }); 
    };
};

Tasks.prototype.read = function(req, res) {
    // Use 'call' so the context would be Tasks.
    this.sendAllTasks(res).call(this, null);
};

Tasks.prototype.create = function(req, res) {
    this.taskProvider.save({
        content: req.body.content,
        isCompleted: false,
        owner: req.body.owner,
        due_date: req.body.due_date
    }, this.sendAllTasks(res).bind(this));
};

Tasks.prototype.del = function(req, res) {
    this.taskProvider.remove(
        req.params[Const.TASK_ID_PARAM], 
        this.sendAllTasks(res).bind(this));
};

Tasks.prototype.update = function(req, res) {
    this.taskProvider.update(req.params[Const.TASK_ID_PARAM], req.body, this.sendAllTasks(res).bind(this));
};

exports.Tasks = Tasks;