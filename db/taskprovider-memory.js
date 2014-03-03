var taskCounter = 1;

TaskProvider = function() {};
TaskProvider.prototype.data = [];

TaskProvider.prototype.findAll = function(callback) {
    callback(null, this.data);
};

TaskProvider.prototype.save = function(tasks, callback) {
    var task = null;
    
    if(typeof(tasks.length) == "undefined")
        tasks = [tasks];
    
    for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        task._id = taskCounter++;
        task.creation_date = new Date();
        
        this.data.push(task);
    }
    
    callback(null, tasks);
};

exports.TaskProvider = TaskProvider;
