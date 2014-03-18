module.exports = function (app, Team) {
    var teamController = require('../controllers/team')(Team);

    app.get('/teams', teamController.readAll);
    app.get('/teams/:id', teamController.read);
    app.del('/teams/:id', teamController.del);
    app.post('/teams/:id/members', teamController.addMembers);
};