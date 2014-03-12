/*
 * GET /.
 */

module.exports = function(Task, User) {
    var index = function (req, res) {
        Task.find({}, function (err, docs) {
            if (err) { res.send(500, 'Error: ' + err); }
            User.find({}, function (err, users) {
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

    return {
        index: index
    };
};

