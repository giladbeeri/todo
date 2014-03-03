
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var index = require('./routes/index');
var user = require('./routes/tasks');
var http = require('http');
var path = require('path');
var TaskProvider = require('./db/taskprovider-mongoose').TaskProvider;
var Const = require('./common/common').Const;
var Urls = require('./common/common').Urls;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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

var taskProvider = new TaskProvider('localhost', 27017);
var indexRouter = new Index(taskProvider);
var taskRouter = new Tasks(taskProvider);

app.get(Urls.ROOT, indexRouter.index.bind(indexRouter)); 
app.get(Urls.TASK_LIST, taskRouter.read.bind(taskRouter)); 
app.post(Urls.TASK_LIST, taskRouter.create.bind(taskRouter));
app.del(Urls.TASK_LIST + ':' + Const.TASK_ID_PARAM, taskRouter.del.bind(taskRouter));
app.put(Urls.TASK_LIST + ':' + Const.TASK_ID_PARAM, taskRouter.update.bind(taskRouter));

// ******* Authentication *********

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('user: ' + username);
        console.log('pass: ' + password);
        // Here you should verify the user, call done(null, username) only if successfully verified.
        return done(null, username);
    }
));
app.get('/login', function(req, res) {
    res.sendfile(path.join(__dirname, 'public', 'login.html'));
});
app.post('/login', passport.authenticate('local', 
                                        { session: true,
                                          successRedirect: '/',
                                          failureRedirect: '/login'
                                          /* Flash messages require connect-flash,
                                          failureFlash: true,
                                          successFlash: 'Welcome aboard!'*/ 
                                          }),
                                        function(req, res) {
                                            console.log('Authenticated ' + req.user.username); 
                                        });                                              

// ******* Authentication - end *********

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
