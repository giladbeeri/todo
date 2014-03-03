require('../../db/taskprovider-memory');
require('../../routes/tasks');

describe('Task Router', function() {
    defaultTasks = [
        {content: "Complete this project", owner: "John Doe", isCompleted: false, due_date: new Date(2014, 3, 1) },
        {content: "Finish your homework", owner: "John Doe", isCompleted: false, due_date: new Date(2014, 2, 28) },
        {content: "Go to sleep", owner: "John Doe", isCompleted: false, due_date: new Date() }
    ];
    var taskProvider;
    var taskRouter;
    beforeEach(function() {
        taskProvider = new TaskProvider();
        taskProvider.save(defaultTasks, function(){});
        taskRouter = new Tasks(taskProvider);
    });
    
    it('should read all tasks', function () {
        taskRouter.read(null, null);
    });
});
