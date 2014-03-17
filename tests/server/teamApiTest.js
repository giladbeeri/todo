var request = require('supertest'),
    express = require('express'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Team = require('../../models/team'),
    User = require('../../models/user'),
    should = require('should');

describe('/teams', function () {
    var app, teams, user1, user2, user;

    before(function (done) {
        app = express();
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
                    teams = [
                        new Team({ name: 'Nicks' }),
                        new Team({ name: 'Bulls' }),
                        new Team({ name: '76ers' }),
                        new Team({ name: 'Clippers' })
                    ];
                    teams[0].members = [user1, user2, user3];
                    Team.create(teams, done);
                });
            });
        });
    });

    afterEach(function (done) {
        mongoose.connection.close(done);
    });

    it('should read all teams', function (done) {
        request(app)
            .get('/teams')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                     if (err) { return done(err); }
                     res.body.should.have.length(teams.length);
                     done();
                 });
    });

    xit('GET should return all tasks', function (done) {
        request(app)
            .get('/tasks/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                     if (err) { return done(err); }
                     res.body.should.have.length(defaultTasks.length);
                     done();
                 });
    });

    xit('DELETE should delete only one task', function (done) {
        // Need to be greater than 1
        defaultTasks.should.not.have.length(0);
        defaultTasks.should.not.have.length(1);

        request(app)
            .del('/tasks/' + taskId.toString())
            .end(function (err, res) {
                     res.body.should.have.length(defaultTasks.length - 1);
                     res.body.forEach(function (task) {
                         task.should.not.have.property('_id', taskId);
                     });
                     done();
                 });
    });
});