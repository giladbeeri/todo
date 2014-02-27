var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

TaskProvider = function(host, port) {
    this.db = new Db('node-mongo-todo', new Server(host, port, {auto_reconnect: true}, {}));
    this.db.open(function(){});
};

TaskProvider.prototype.getCollection = function(callback) {
    this.db.collection('tasks', function(err, task_collection) {
       if (err) callback(err);
       else callback(null, task_collection);
    });
};

TaskProvider.prototype.findAll = function(callback) {
    this.getCollection(function(err, task_collection) {
        if (err) callback(err);
        else {
            task_collection.find().toArray(function(err, results) {
               if (err) callback(err);
               else callback(null, results); 
            });
        } 
    });
};

TaskProvider.prototype.save = function(tasks, callback) {
    this.getCollection(function(err, task_collection) {
        if (err) callback(err);
        else {
            if (typeof(tasks.length) == "undefined")
                tasks = [tasks];
            
            // Consider changing to foreach\every
            for (var i = 0; i < tasks.length; i++) {
                task = tasks[i];
                task.creation_date = new Date();
            }
            
            task_collection.insert(tasks, function() {
                callback(null, tasks); 
            });
        } 
    });
};

TaskProvider.prototype.remove = function(tasks, callback) {
    this.getCollection(function(err, task_collection) {
       if (err) callback(err);
       else {
           task_collection.remove(tasks, function() {
              callback(null, tasks); 
           });
       } 
    });
};

exports.TaskProvider = TaskProvider;
