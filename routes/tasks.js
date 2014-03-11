var Const = require('../common/common').Const;
var Urls = require('../common/common').Urls;

module.exports = function (app, Task) {
    var taskController = require('../controllers/tasks')(Task);
    
    app.get(Urls.TASK_LIST, taskController.read);
    app.post(Urls.TASK_LIST, taskController.create);
    app.del(Urls.TASK, taskController.del);
    app.put(Urls.TASK, taskController.update);
};
