var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Task = new Schema({
            content: String,
            owner: String, 
            done: { type: Boolean, default: false },
            creation_date: { type: Date, default: Date.now },
            due_date: Date
            });

Task.statics.findAll = function(callback) {
    this.find(function(err, tasks) {
       if (err) callback(err);
       else {
           callback(null, tasks);
       } 
    });
};

Task.statics.save = function(tasks, callback) {
    if (typeof(tasks.length) == "undefined")
        tasks = [tasks];
    this.create(tasks, function(err, tasks) {
        if (err) callback(err);
        else callback(null, tasks);
    });
};

Task.statics.del = function(taskId, callback) {
    console.log("Task: Remove task #", taskId);
    this.findByIdAndRemove(taskId, function(err, task) {
        if (err) callback(err);
        else callback(null, task);
    });
};

Task.statics.update = function(taskId, newData, callback) {
    console.log('Updating #', taskId, ' with ', newData);
    this.findByIdAndUpdate(
        taskId,
        newData,
        function(err, task) {
            if (err) callback(err);
            else callback(null, task);
        }
    );
};

Task.statics.toggleTask = function(taskId, callback) {
    this.find(
        { _id: taskId },
        'done',
        function(err, tasks) {
            if (err || !tasks) callback(err, null);
            else {
                this.update(taskId, { done: !tasks[0].done }, function(err, tasks) {
                    if (err) callback(err);
                    else callback(null, tasks);
                });            
            }    
        });
};

// This is an ugly patch to a problem with mongoose testing that I couldn't find a solution for.
// See https://github.com/LearnBoost/mongoose/issues/1251.
try {
    module.exports = mongoose.model('Task', Task);
} catch(err) {
    module.exports = mongoose.model('Task');
}

