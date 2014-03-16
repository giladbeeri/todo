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
    var team;

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
        team = new Team({ name: TEAM_NAME });
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

        it('should be created with a name', function (done) {
            team = new Team();
            team.save(function (err, team) {
                should.exist(err);
                err.name.should.eql('ValidationError');
                done();
            });
        });

        xit('should have a unique name', function (done) {
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

    describe('member addition', function (done) {
        it('should add new members to an empty team', function (done) {
            var MEMBERS = [new ObjectId()];
            team.save(function (err, team) {
                if (err) { console.error(err); }
                team.addMembers(MEMBERS, function (err, team) {
                    team.members.toString().should.eql(MEMBERS.toString());
                    done();
                });
            });
        });

        xit('should verify new members are users', function (done) {

        });

        it('should add new members to a non-empty team', function (done) {
            var OID1 = new ObjectId(),
                OID2 = new ObjectId();
            var MEMBERS = [OID1];
            team.members = MEMBERS;
            team.save(function (err, team) {
                if (err) { console.error(err); }
                team.addMembers([OID2], function (err, team) {
                    team.members.should.have.length(2);
                    team.members.toString().should.eql([OID1, OID2].toString());
                    done();
                });
            });
        });

        it('should avoid duplicate users', function (done) {
            var OID = new ObjectId();
            var MEMBERS = [OID];
            team.members = MEMBERS;
            team.save(function (err, team) {
                if (err) { console.error(err); }
                team.addMembers([OID], function (err, team) {
                    team.members.should.have.length(1);
                    team.members.toString().should.eql(MEMBERS.toString());
                    done();
                });
            });
        });
    });
});