var Urls = require('../config/common').Urls;

module.exports = function (app, passport, Task, User, Team) {
    indexController = require('../controllers/index')(Task, User);
    app.get(Urls.ROOT, indexController.index);
    
    require('./tasks')(app, Task);
    require('./users')(app, passport, User);
    require('./teams')(app, Team);
};
