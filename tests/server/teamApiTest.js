var request = require('supertest'),
    express = require('express'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Team = require('../../models/team'),
    User = require('../../models/user'),
    should = require('should');

describe('/teams', function () {
    var app, defaultTeams, user1, user2, user3;

    before(function (done) {
        app = express();
        app.use(express.bodyParser());
        require('../../routes/teams')(app, Team);
        done();
    });

    beforeEach(function (done) {
        mongoose.connect('mongodb://localhost:27017/tasklist-test');
        mongoose.connection.on('error', function (err) {
            console.log(err);
        });
        mongoose.connection.once('connected', function () {
            mongoose.connection.db.dropDatabase(function () {
                user1 = new User({ username: 'Carmelo Anthony', password: 'CA'});
                user2 = new User({ username: 'Tyson Chandler', password: 'TC'});
                user3 = new User({ username: 'Kenyon Martin', password: 'KM'});
                User.create([user1, user2, user3], function () {
                    defaultTeams = [
                        new Team({ name: 'Nicks' }),
                        new Team({ name: 'Bulls' }),
                        new Team({ name: '76ers' }),
                        new Team({ name: 'Clippers' })
                    ];
                    defaultTeams[0].members = [user1, user2, user3];
                    Team.create(defaultTeams, done);
                });
            });
        });
    });

    afterEach(function (done) {
        mongoose.connection.close(done);
    });

    it('GET should read all teams', function (done) {
        request(app)
            .get('/teams')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(
            function (err, res) {
                if (err) { return done(err); }
                res.body.should.have.length(defaultTeams.length);
                done();
            });
    });

    it('GET should return a specific team', function (done) {
        request(app)
            .get('/teams/' + defaultTeams[0]._id.toString())
            .expect('Content-Type', /json/)
            .expect(200)
            .end(
            function (err, res) {
                if (err) { return done(err); }
                res.body.should.have.property('_id', defaultTeams[0]._id.toString());
                res.body.should.have.property('members');
                done();
            });
    });

    it('DELETE should delete only one team', function (done) {
        // Need to be greater than 1
        defaultTeams.should.not.have.length(0);
        defaultTeams.should.not.have.length(1);
        var ID = defaultTeams[1]._id.toString();
        request(app)
            .del('/teams/' + ID)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(
            function (err, res) {
                res.body.should.have.property('_id', ID);
                Team.find(function (err, teams) {
                    if (err) { res.send(500, err); }
                    teams.should.have.length(defaultTeams.length - 1);
                    done();
                });
            });
    });

    it('POST should create a new team', function (done) {
        var NAME = 'Kings';
        request(app)
            .post('/teams')
            .send({ name: NAME })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(
            function (err, res) {
                res.body.should.have.property('_id');
                res.body.should.have.property('name', NAME);
                res.body.should.have.property('members');
                res.body.members.should.have.length(0);
                done();
            });
    });

    describe('/teams/id/members', function (done) {
        it('POST /members should add new members', function (done) {
            var testedTeam = defaultTeams[1];
            var originalMembersCount = testedTeam.members.length;
            var newMembers = [user1._id, user2._id];
            request(app)
                .post('/teams/' + testedTeam._id.toString() + '/members')
                .send({ members: newMembers })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(
                function (err, res) {
                    res.body.should.have.property('members');
                    res.body.members.should.have.length(originalMembersCount + newMembers.length);
                    done();
                });
        });

        it('DELETE /members should remove members', function (done) {
            var testedTeam = defaultTeams[0];
            var originalMembersCount = testedTeam.members.length;
            var removedMembers = [user1._id];

            request(app)
                .del('/teams/' + testedTeam._id.toString() + '/members')
                .send({ members: removedMembers })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(
                function (err, res) {
                    res.body.should.have.property('members');
                    res.body.members.should.have.length(originalMembersCount - removedMembers.length);
                    done();
                });
        });
    });
});