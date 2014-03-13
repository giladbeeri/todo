module.exports = function (Team) {
    var readAll = function (req, res) {
        Team.find(function (err, teams) {
            if (err) { res.send(500, err); }
            res.json(teams);
        });
    };

    return {
        readAll: readAll
    };
};