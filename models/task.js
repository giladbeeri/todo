var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Task = new Schema({
            content: String,
            owner: String, 
            done: { type: Boolean, default: false },
            creation_date: { type: Date, default: Date.now },
            due_date: Date
            });

Task.statics.toggleTask = function(taskId, callback) {
    this.findById(
        taskId,
        'done',
        function(err, task) {
            if (err || !task) { callback(err, null); }
            else {
                task.done = !task.done;
                task.save(callback);
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

