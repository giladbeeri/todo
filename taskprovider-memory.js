var taskCounter = 1;

TaskProvider = function() {};
TaskProvider.prototype.data = [];

TaskProvider.prototype.findAll = function(callback) {
    callback(null, this.data);
};

TaskProvider.prototype.save = function(tasks, callback) {
    var task = null;
    
    for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        task._id = taskCounter++;
        task.creation_date = new Date();
        
        this.data.push(task);
    }
    
    callback(null, tasks);
};

defaultTasks = [
{content: "Complete this project", owner: "Sammy Brister", isCompleted: false, due_date: new Date(2014, 3, 1) },
{content: "Finish your homework", owner: "Sammy Brister", isCompleted: false, due_date: new Date(2014, 2, 28) },
{content: "Go to sleep", owner: "Sammy Brister", isCompleted: false, due_date: new Date() }
];

new TaskProvider().save(defaultTasks, function(){});

exports.TaskProvider = TaskProvider;
