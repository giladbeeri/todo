var Const = require('../config/common').Const;
var Urls = require('../config/common').Urls;

module.exports = function (app, Task) {
    var taskController = require('../controllers/task')(Task);
    
    app.get(Urls.TASK_LIST, taskController.read);
    app.post(Urls.TASK_LIST, taskController.create);
    app.del(Urls.TASK, taskController.del);
    app.put(Urls.TASK, taskController.update);
};
