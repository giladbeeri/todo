var Task = require('../models/task');

TaskProvider = function(host, port) {
};


TaskProvider.prototype.findAll = function(callback) {
    Task.find(function(err, tasks) {
       if (err) callback(err);
       else {
           callback(null, tasks);
       } 
    });
};

TaskProvider.prototype.save = function(tasks, callback) {
    if (typeof(tasks.length) == "undefined")
        tasks = [tasks];
    Task.create(tasks, function(err, tasks) {
        if (err) callback(err);
        else callback(null, tasks);
    });
};

TaskProvider.prototype.remove = function(taskId, callback) {
    console.log("TaskProvider: Remove task #" + taskId);
    Task.remove({ _id: taskId }, function(err, tasks) {
       if (err) callback(err);
       else callback(null, tasks); 
    });
};

TaskProvider.prototype.update = function(taskId, newData, callback) {
    console.log('Updating #', taskId, ' with ', newData);
    Task.findByIdAndUpdate(
        taskId,
        newData,
        function(err, task) {
            if (err) callback(err);
            else callback(null, task);
        }
    );
};

TaskProvider.prototype.toggleTask = function(taskId, callback) {
    Task.find(
        { _id: taskId },
        'done',
        function(taskProvider) {
            return function(err, tasks) {
                if (err || !tasks) callback(err, null);
                else {
                    taskProvider.update(taskId, { done: !tasks[0].done }, function(err, tasks) {
                        if (err) callback(err);
                        else callback(null, tasks);
                    });            
                }    
            };
        }(this));
};

exports.TaskProvider = TaskProvider;
