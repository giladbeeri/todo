var _ = require('underscore');

module.exports = function (Team) {
    var readAll = function (req, res) {
        Team.find(function (err, teams) {
            if (err) { res.send(500, err); }
            res.json(teams);
        });
    };

    var read = function (req, res) {
        Team.findById(req.params['id'], function (err, team) {
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

    var del = function (req, res) {
        Team.findByIdAndRemove(req.params['id'], function (err, team) {
            if (err) { res.send(500, err); }
            res.json(team);
        });
    };

    var changeMembers = function (req, res, func) {
        Team.findById(req.body.id, function (err, team) {
            if (err) { res.send(500, err); }
            team[func](req.body.members, function (err, updatedTeam) {
                if (err) { res.send(500, err); }
                res.json(updatedTeam);
            });
        });
    };

    var addMembers = function (req, res) {
        changeMembers(req, res, 'addMembers');
    };

    var removeMembers = function (req, res) {
        changeMembers(req, res, 'removeMembers');
    };

    return {
        readAll: readAll,
        read: read,
        create: create,
        del: del,
        addMembers: addMembers,
        removeMembers: removeMembers
    };
};