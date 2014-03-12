module.exports = function (app, User) {
    var userController = require('../controllers/user')(User);

    app.get('/login', userController.getLoginPage);
    app.get('/register', userController.getRegisterPage);
    app.post('/login', userController.login);
    app.post('/register', userController.register);
    app.get('/logout', userController.logout);
};



