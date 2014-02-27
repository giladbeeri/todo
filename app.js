
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var TaskProvider = require('./db/taskprovider-mongoose').TaskProvider;

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
app.use(app.router);
app.use(express.bodyParser());
app.use(require('stylus').middleware({
    src: path.join(__dirname, 'views'), 
    dest: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '.')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var ROOT = '/todo';

var taskProvider = new TaskProvider('localhost', 27017);

app.get(ROOT, function(req, res) {
    taskProvider.findAll(function(err, docs) {
        res.render('index.jade', {
            title: 'Shared TODO',
            tasks: docs
            });
    });
});

var sendAllTasks = function(res) {
    return function(err) {
        if (err) res.send(err);
        taskProvider.findAll(function(err, tasks) {
            if (err) res.send(err);
            res.json(tasks); 
        }); 
    };
};

app.get(ROOT + '/list', function(req, res) {
    sendAllTasks(res)(null);
});

app.post(ROOT, function(req, res) {
   taskProvider.save({
        content: req.body.content,
        isCompleted: false,
        owner: req.body.owner,
        due_date: req.body.due_date
    }, sendAllTasks(res));
});

app.del(ROOT + '/:todo_id', function(req, res) {
    taskProvider.remove(req.params["todo_id"], sendAllTasks(res));
});

app.put(ROOT + '/:todo_id', function(req, res) {
    taskProvider.toggleTask(req.params["todo_id"], sendAllTasks(res));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
