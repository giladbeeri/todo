IndexController = function (Task, User) {
    this.Task = Task;
    this.User = User;
};

/*
 * GET /.
 */

IndexController.prototype.index = function (req, res) {
    var thisObj = this;
    this.Task.findAll(function (err, docs) {
        if (err) { res.send(500, 'Error: ' + err); }
        thisObj.User.find({}, function (err, users) {
             if (err) { res.send(500, 'Error: ' + err); } 
             var usernames = users.map(function (user) { return user.username; });
             res.render('index.jade', {
                            title: 'Shared TODO',
                            tasks: docs,
                            user: req.user,
                            users: usernames
                        });
        });
        
    });
};

exports.IndexController = IndexController;