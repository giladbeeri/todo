module.exports = function (app, passport, User) {
    var userController = require('../controllers/user')(passport, User);

    app.get('/login', userController.getLoginPage);
    app.get('/register', userController.getRegisterPage);
    app.post('/login', userController.login);
    app.post('/register', userController.register);
    app.get('/logout', userController.logout);
};



