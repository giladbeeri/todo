var passport = require('passport');
var fs = require('fs');
var mustache = require('mustache');

var loginRegisterRoute = function(req, res, options) {
    fs.readFile('./views/login_register_template.mustache', { encoding: 'utf8' }, function(err, data) {
        if (err) {
            console.error(err.stack);
            res.send(500, 'Failed reading file');
        }

        res.send(mustache.to_html(data, options));
    });
};

module.exports = function (app, User) {
    app.get('/login', function(req, res) {
        loginRegisterRoute(req, res, { action: 'login', title: 'Sign in', rememberMe: true });
    });

    app.get('/register', function(req, res) {
        loginRegisterRoute(req, res, { action: 'register', title: 'Register', rememberMe: false });
    });

    app.post('/login', passport.authenticate('local',
                                             { session: true,
                                                 successRedirect: '/',
                                                 failureRedirect: '/login',
                                                 failureFlash: true,
                                                 successFlash: 'Welcome aboard!'
                                             }),
             function(req, res) {
                 console.log('Authenticated ' + req.user.username);
             });

    app.post('/register', function(req, res) {
        var user = new User({ username: req.body.username });
        User.register(user, req.body.password, function (err, user) {
            if (err) { return res.send(500, 'Failed registering: ' + JSON.stringify(err)); }
            req.login(user, function (err) {
                if (err) { return res.send(500, 'Failed login: ' + JSON.stringify(err)); }
                return res.redirect('/');
            });
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};



