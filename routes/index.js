var mongoose = require('mongoose');
var User = mongoose.model('User');
var Task = mongoose.model('Task');

/*
 * GET home page.
 */
Index = function() {
};

Index.prototype.index = function(req, res) {
    Task.findAll(function(err, docs) {
        if (err) { res.send(500, 'Error: ' + err); }
        User.find({}, function(err, users) {
             if (err) { res.send(500, 'Error: ' + err); } 
             var usernames = users.map(function(user) { return user.username; });
             res.render('index.jade', {
                            title: 'Shared TODO',
                            tasks: docs,
                            user: req.user,
                            users: usernames
                        });
        });
        
    });
};

exports.Index = Index;