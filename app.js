
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
var flash = require('connect-flash');
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

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./routes')(app, passport, Task, User);

mongoose.connect(Const.DB_URI);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
