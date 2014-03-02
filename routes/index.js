
/*
 * GET home page.
 */
Index = function(taskProvider) {
    this.taskProvider = taskProvider;
};

Index.prototype.index = function(req, res) {
    this.taskProvider.findAll(function(err, docs) {
        res.render('index.jade', {
            title: 'Shared TODO',
            tasks: docs
            });
    });
};

exports.Index = Index;