module.exports = function (Team) {
    var readAll = function (req, res) {
        Team.find(function (err, teams) {
            if (err) { res.send(500, err); }
            res.json(teams);
        });
    };

    var read = function (req, res) {
        Team.findById(req.body.id, function (err, team) {
            if (err) { res.send(500, err); }
            res.json(team);
        });
    };

    var create = function (req, res) {
        var team = new Team({ name: req.body.name });
        team.save(function (err, team) {
            if (err) { res.send(500, err); }
            res.json(team);
        });
    };

    return {
        readAll: readAll,
        read: read,
        create: create
    };
};