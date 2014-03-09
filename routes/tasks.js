var Const = require('../common/common').Const;
var Urls = require('../common/common').Urls;
var TaskController = require('../controllers/tasks').TaskController;

module.exports = function (app, Task) {
    taskController = new TaskController(Task);
    
    app.get(Urls.TASK_LIST, taskController.read.bind(taskController)); 
    app.post(Urls.TASK_LIST, taskController.create.bind(taskController));
    app.del(Urls.TASK_LIST + ':' + Const.TASK_ID_PARAM, taskController.del.bind(taskController));
    app.put(Urls.TASK_LIST + ':' + Const.TASK_ID_PARAM, taskController.update.bind(taskController));
};
