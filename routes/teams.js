module.exports = function (app, Team) {
    var teamController = require('../controllers/team')(Team);

    app.get('/teams', teamController.readAll);
};