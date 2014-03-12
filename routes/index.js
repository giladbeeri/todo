var Urls = require('../common/common').Urls;

module.exports = function (app, Task, User) {
    indexController = require('../controllers/index')(Task, User);
    app.get(Urls.ROOT, indexController.index);
    
    require('./tasks')(app, Task);
    require('./user')(app, User);
};
