var Urls = require('../config/common').Urls;

module.exports = function (app, passport, Task, User) {
    indexController = require('../controllers/index')(Task, User);
    app.get(Urls.ROOT, indexController.index);
    
    require('./tasks')(app, Task);
    require('./users')(app, passport, User);
};
