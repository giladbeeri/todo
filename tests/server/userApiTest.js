var request = require('supertest'),
    express = require('express'),
    mongoose = require('mongoose'),
    User = require('../../models/user'),
    should = require('should');

describe('users ', function () {
    var app;
    var USER1 = 'testUser1',
        PASS1 = 'testPass1',
        USER2 = 'testUser2',
        PASS2 = 'testPass2';

    before(function (done) {
        app = express();
        require('../../routes/users')(app, User);
        mongoose.connect('mongodb://localhost:27017/tasklist-test');
        mongoose.connection.on('error', function (err) {
            console.log(err);
        });
        mongoose.connection.once('connected', done);
    });

    beforeEach(function (done) {
        User.remove({}, function() {
            var user = new User({ username: USER1, password: PASS1});
            user.save(done);
            /*User.register(
             { username: USER1 },
             PASS1,
             function (err, user) {
             if (err) { console.error(err); }
             done(err);
             }
             );*/
        });
    });

    after(function (done) {
        mongoose.connection.close(done);
    });

    it('should be able to see login page', function (done) {
        request(app)
            .get('/login')
            .expect(200, done);
    });

    it('should be able to login successfully', function (done) {
        request(app)
            .post('/login/')
            .send({ username: USER1, password: PASS1 })
            .expect(200)
            .end(function (err, res) {
                     if (err) { return done(err); }
                     res.header['location'].should.include('/');
                     done();
                 });
    });

    /*it('should be able to register', function (done) {
        request(app)
            .post('/register/')
            .send({ username: USER2, password: PASS2 })
            .expect(200)
            .end(function (err, res) {
                     if (err) {
                         console.error(res.text);
                         return done(err);
                     }
                     res.header['location'].should.include('/');
                     done();
                 });
    });*/
});