var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;
var Team = require('../../models/team'),
    User = require('../../models/user'),
    should = require('should');

describe('Team model', function () {
    var teamId = new ObjectId('00112233445566778899AABB').toString();
    var USER1 = 'testUser1',
        PASS1 = 'testPass1',
        USER2 = 'testUser2',
        PASS2 = 'testPass2';
    var TEAM_NAME = 'Power Rangers';

    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/tasklist-test');
        mongoose.connection.on('error', function (err) {
            console.log(err);
        });
        mongoose.connection.once('connected', function () {
            mongoose.connection.db.dropDatabase(function () {
                var user1 = new User({ username: USER1, password: PASS1}),
                    user2 = new User({ username: USER2, password: PASS2});
                User.create([user1, user2], done);
            });
        });
    });

    beforeEach(function (done) {
        Team.remove({}, function (err) {
            if (err) { console.error(err); }
            done();
        });
    });

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });

    describe('creation', function (done) {
        it('should save a new team', function (done) {
            var team = new Team({ name: TEAM_NAME });
            team.save(function () {
                Team.find(function (err, teams) {
                    if (err) {
                        console.log(err);
                        done(err);
                    }
                    teams.should.have.length(1);
                    teams[0].should.have.property('name', TEAM_NAME);
                    teams[0].members.should.have.length(0);
                    done();
                });
            });
        });

        it('should not be created without a name', function (done) {
            var team = new Team();
            team.save(function (err, team) {
                should.exist(err);
                err.name.should.eql('ValidationError');
                done();
            });
        });

        xit('should have a unique name', function (done) {
            var team = new Team({ name: TEAM_NAME });
            team.save(function () {
                var team2 = new Team({ name: TEAM_NAME });
                team2.save(function (err) {
                    //should.exist(err);
                    console.log(err);
                    Team.find(function (err, teams) {
                        if (err) {
                            console.log(err);
                            done(err);
                        }
                        console.log(teams);
                        done();
                    });
                });
            });
        });
    });
});