var mongoose = require('mongoose');

TaskProvider = function(host, port) {
    this.db = mongoose.connect('mongodb://localhost:27017/node-mongo-todo');
    this.schema = new mongoose.Schema({
            content: String,
            owner: String, 
            done: { type: Boolean, default: false },
            creation_date: { type: Date, default: Date.now },
            due_date: Date,
        });
    this.Task = mongoose.model('Task', this.schema);
};


TaskProvider.prototype.findAll = function(callback) {
    this.Task.find(function(error, tasks) {
       if (error) callback(error);
       else {
           callback(null, tasks);
       } 
    });
};

TaskProvider.prototype.save = function(tasks, callback) {
    if (typeof(tasks.length) == "undefined")
        tasks = [tasks];
    this.Task.create(tasks, function(error, tasks) {
        if (error) callback(error);
        else callback(null, tasks);
    });
};

TaskProvider.prototype.remove = function(taskId, callback) {
    console.log("TaskProvider: Remove task #" + taskId);
    this.Task.remove({ _id: taskId }, function(error, tasks) {
       if (error) callback(error);
       else callback(null, tasks); 
    });
};

TaskProvider.prototype.update = function(taskId, newData, callback) {
    this.Task.update(
        { _id: taskId },
        newData,
        {},
        function(err, numAffected) {
            if (err) callback(err);
            else callback(null, numAffected);
        });
};

TaskProvider.prototype.completeTask = function(taskId, callback) {
    this.update(taskId, { done: true }, function(err, tasks) {
        if (err) callback(err);
        else callback(null, tasks);
    });  
};

exports.TaskProvider = TaskProvider;
