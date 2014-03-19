module.exports = function (app, Team) {
    var teamController = require('../controllers/team')(Team);

    app.get('/teams', teamController.readAll);
    app.post('/teams', teamController.create);
    app.get('/teams/:id', teamController.read);
    app.del('/teams/:id', teamController.del);
    app.post('/teams/:id/members', teamController.addMembers);
    // DELETE is usually used to delete a resource, here it is used to remove members from a team.
    app.del('/teams/:id/members', teamController.removeMembers);
};