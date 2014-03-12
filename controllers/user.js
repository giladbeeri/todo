var passport = require('passport');
var fs = require('fs');
var mustache = require('mustache');

module.exports = function (User) {
    var loginRegisterRoute = function(req, res, options) {
        fs.readFile('./views/login_register_template.mustache',
                    { encoding: 'utf8' },
                    function(err, data) {
                        if (err) {
                            console.error(err.stack);
                            res.send(500, 'Failed reading file');
                        }
                        res.send(mustache.to_html(data, options));
                    });
    };

    var getLoginPage = function (req, res) {
        loginRegisterRoute(req, res,
                           { action: 'login', title: 'Sign in', rememberMe: true });
    };

    var getRegisterPage = function (req, res) {
        loginRegisterRoute(req, res,
                           { action: 'register', title: 'Register', rememberMe: false });
    };

    var login = function (req, res) {
        passport.authenticate(
            'local',
            { session: true,
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true,
                successFlash: 'Welcome aboard!'
            }),
            function(req, res) {
                console.log('Authenticated ' + req.user.username);
            }
    };

    var register = function (req, res) {
        var user = new User({ username: req.body.username });
        User.register(user, req.body.password, function (err, user) {
            if (err) { return res.send(500, 'Failed registering: ' + JSON.stringify(err)); }
            req.login(user, function (err) {
                if (err) { return res.send(500, 'Failed login: ' + JSON.stringify(err)); }
                return res.redirect('/');
            });
        });
    };

    var logout = function (req, res) {
        req.logout();
        res.redirect('/');
    };

    return {
        getLoginPage: getLoginPage,
        gRegisterPage: getRegisterPage,
        login: login,
        register: register,
        logout: logout
    };
};