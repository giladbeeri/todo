var Const = require('../common/common').Const;
var Urls = require('../common/common').Urls;
var TaskController = require('../controllers/tasks').TaskController;

module.exports = function (app, Task) {
    taskController = new TaskController(Task);
    
    app.get(Urls.TASK_LIST, taskController.read.bind(taskController)); 
    app.post(Urls.TASK_LIST, taskController.create.bind(taskController));
    app.del(Urls.TASK, taskController.del.bind(taskController));
    app.put(Urls.TASK, taskController.update.bind(taskController));
};
