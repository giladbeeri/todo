
/**
 * Module dependencies.
 */

var express = require('express');
var User = require('./models/user');
var Task = require('./models/task');

var Const = require('./common/common').Const;
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var fs = require('fs');
var mustache = require('mustache');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('keyboard cat'));
app.use(express.session());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.bodyParser());
app.use(require('stylus').middleware({
    src: path.join(__dirname, 'views'), 
    dest: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname, 'routes')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes')(app, Task, User);

// ******* Authentication *********
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var loginResgiterRoute = function(req, res, options) {
    fs.readFile('./views/login_register_template.mustache', { encoding: 'utf8' }, function(err, data) {
        if (err) {
            console.error(err.stack);
            res.send(500, 'Failed reading file');
        }
               
        res.send(mustache.to_html(data, options));
    });
};

app.get('/login', function(req, res) {
    loginResgiterRoute(req, res, { action: 'login', title: 'Sign in', rememberMe: true });
});

app.get('/register', function(req, res) {
    loginResgiterRoute(req, res, { action: 'register', title: 'Register', rememberMe: false });
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

// ******* Authentication - end *********

mongoose.connect(Const.DB_URI);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
