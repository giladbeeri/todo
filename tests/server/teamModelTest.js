var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;
var Team = require('../../models/team'),
    should = require('should');

describe('Team model', function () {
    var teamId = new ObjectId('00112233445566778899AABB').toString();

    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/tasklist-test');
        mongoose.connection.on('error', function (err) {
            console.log(err);
        });
        mongoose.connection.once('connected', function () {
            mongoose.connection.db.dropDatabase(done);
        });
    });

    beforeEach(function (done) {
        Team.remove({}, function (err) {
            if (err) { console.error(err); }
            done();
        });
    });

    after(function (done) {
        mongoose.connection.close(done);
    });

    it('should save and return all tasks', function (done) {
        done();
    });
});