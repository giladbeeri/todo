var Const = require('../common/common').Const;

module.exports = function(Task) {
    var sendAllTasks = function (res) {
        return function (err) {
            if (err) res.send(err);
            Task.find({}, function (err, tasks) {
                if (err) { res.send(err) };
                res.json(tasks);
            });
        };
    };

    var read = function (req, res) {
        sendAllTasks(res)(null);
    };

    var create = function (req, res) {
        var task = new Task(
            {
                content: req.body.content,
                owner: req.body.owner,
                due_date: req.body.due_date
            });
        task.save(sendAllTasks(res));
    };

    var del = function (req, res) {
        Task.findByIdAndRemove(
            req.params[Const.TASK_ID_PARAM],
            sendAllTasks(res));
    };

    var update = function (req, res) {
        Task.findByIdAndUpdate(req.params[Const.TASK_ID_PARAM],
                               req.body,
                               sendAllTasks(res));
    };

    return {
        read: read,
        create: create,
        del: del,
        update: update
    };
};
