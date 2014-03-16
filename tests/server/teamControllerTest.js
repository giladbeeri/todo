var Const = require('../../config/common').Const;
var Team = require('../../models/team'),
    teamCtrl = require('../../controllers/team')(Team);
var httpMocks = require('node-mocks-http');
var should = require('should'),
    sinon = require('sinon');

describe('Team Ctrl', function() {
    var req, res, TeamMock, ID;

    beforeEach(function() {
        res = httpMocks.createResponse();
        req = httpMocks.createRequest();
        TeamMock = sinon.mock(Team);
        ID = 5;
    });

    afterEach(function () {
        TeamMock.restore();
    });

    it('should return all teams', function () {
        var findExpectation = TeamMock.expects('find');
        findExpectation.once();
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
        var findByIdExpectation = TeamMock.expects('findById');
        findByIdExpectation.once()
            .withArgs(ID)
            .callsArgWith(1, null, { _id: ID, data: 'aa' });
        req.body.id = ID;
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
        var MEMBERS = ['John', 'Doe'];
        var findByIdExpectation = TeamMock.expects('findById');
        findByIdExpectation.once()
            .withArgs(ID)
            .callsArgWith(1, null,
                          {
                              _id: ID,
                              members: [],
                              save: function (cb) {
                                  cb(null, this);
                              }
                          });
        req.body.id = ID;
        req.body.members = MEMBERS;

        teamCtrl.addMembers(req, res);

        var data = JSON.parse(res._getData());
        data.should.have.property('_id', ID);
        data.should.have.property('members', MEMBERS);

        TeamMock.verify();
    });
});
