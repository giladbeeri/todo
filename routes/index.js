var mongoose = require('mongoose');
var User = mongoose.model('User');

/*
 * GET home page.
 */
Index = function(taskProvider) {
    this.taskProvider = taskProvider;
};

Index.prototype.index = function(req, res) {
    this.taskProvider.findAll(function(err, docs) {
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