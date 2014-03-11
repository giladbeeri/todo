var Urls = require('../common/common').Urls;
var IndexController = require('../controllers/index').IndexController;

module.exports = function (app, Task, User) {
    indexController = new IndexController(Task, User);
    app.get(Urls.ROOT, indexController.index.bind(indexController));
    
    require('./tasks')(app, Task);
    require('./user')(app, User);
};
