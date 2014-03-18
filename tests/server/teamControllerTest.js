var Const = require('../../config/common').Const;
var Team = require('../../models/team');
var httpMocks = require('node-mocks-http');
var should = require('should'),
    sinon = require('sinon'),
    ObjectId = require('mongoose').Types.ObjectId,
    _ = require('underscore');

describe('Team Ctrl', function() {
    var req, res, TeamMock, ID, teamCtrl;

    beforeEach(function() {
        res = httpMocks.createResponse();
        req = httpMocks.createRequest();
        TeamMock = sinon.mock(Team);
        ID = 5;
        teamCtrl = require('../../controllers/team')(Team);
    });

    afterEach(function () {
        TeamMock.restore();
    });

    it('should return all teams', function () {
        var findExpectation = TeamMock.expects('find')
            .once();
        // Call the callback with (null, defaultTasks)
        findExpectation.callsArgWith(0, null, ['aa', 'bb']);
        teamCtrl.readAll(null, res);
        var data = JSON.parse(res._getData());
        data.should.have.length(2);
        data[0].should.eql('aa');
        data[1].should.eql('bb');

        TeamMock.verify();
    });

    it('should return a team by its id', function () {
        var findByIdExpectation = TeamMock.expects('findById')
            .once()
            .withArgs(ID)
            .callsArgWith(1, null, { _id: ID, data: 'aa' });
        req.params['id'] = ID;
        teamCtrl.read(req, res);

        var data = JSON.parse(res._getData());
        data.should.have.property('_id', ID);
        data.should.have.property('data', 'aa');

        TeamMock.verify();
    });

    it('should create a new team and return it', function () {
        var TeamMock = function (teamDetails) {
            this.name = teamDetails.name;
            this.saved = false;
        };
        TeamMock.prototype.save = function (cb) {
            this.saved = true;
            cb(null, this);
        };

        var TEAM_NAME = 'Turtles';
        var team = new TeamMock({ name: TEAM_NAME });
        req.body.name = TEAM_NAME;
        var teamCtrl = require('../../controllers/team')(TeamMock);
        teamCtrl.create(req, res);

        var data = JSON.parse(res._getData());
        data.should.have.property('name', TEAM_NAME);
        data.saved.should.be.true;
    });

    it('should add new members', function () {
        var MEMBERS = [new ObjectId(), new ObjectId()];
        var TEAM = {
            _id: ID,
            members: [],
            addMembers: function (members, cb) {
                this.members = this.members.concat(members);
                cb(null, this);
            }
        };

        var findByIdExpectation = TeamMock.expects('findById')
            .once()
            .withArgs(ID)
            .callsArgWith(1, null, TEAM);

        // Here I tried to expect a call to addMembers, in different ways,
        // but I couldn't make sinon allow 2 expectations. I was getting:
        // "TypeError: Cannot read property 'restore' of undefined"
        // when I tried to set var addMembersExpectation = TeamMock.expects('addMembers').
        // Also, other methods I tried didn't work.

        req.body.id = ID;
        req.body.members = MEMBERS;

        teamCtrl.addMembers(req, res);

        var data = JSON.parse(res._getData());
        data.should.have.property('_id', ID);
        data.members.toString().should.eql(MEMBERS.toString());

        TeamMock.verify();
    });

    it('should remove members from a team', function () {
        var OID1 = new ObjectId(),
            OID2 = new ObjectId(),
            OID3 = new ObjectId();
        var MEMBERS = [OID1, OID2, OID3];

        var TEAM = {
            _id: ID,
            members: MEMBERS,
            removeMembers: function (members, cb) {
                this.members = _.difference(this.members, members);
                cb(null, this);
            }
        };

        var findByIdExpectation = TeamMock.expects('findById')
            .once()
            .withArgs(ID)
            .callsArgWith(1, null, TEAM);

        req.body.id = ID;
        req.body.members = [OID1, OID3];

        teamCtrl.removeMembers(req, res);

        var data = JSON.parse(res._getData());
        data.should.have.property('_id', ID);
        data.members.should.have.length(1);
        data.members.toString().should.eql([OID2].toString());

        TeamMock.verify();
    });

    it('should delete a team', function () {
        var findByIdAndRemoveExpectation = TeamMock.expects('findByIdAndRemove')
            .once()
            .withArgs(ID)
            .callsArgWith(1, null, { _id: ID, data: 'aa' });
        req.params['id'] = ID;
        teamCtrl.del(req, res);

        var data = JSON.parse(res._getData());
        data.should.have.property('_id', ID);
        data.should.have.property('data', 'aa');

        TeamMock.verify();
    });
});
