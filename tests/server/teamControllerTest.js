var Const = require('../../config/common').Const;
var Team = require('../../models/team'),
    teamCtrl = require('../../controllers/team')(Team);
var httpMocks = require('node-mocks-http');
var should = require('should'),
    sinon = require('sinon');

describe('Team Ctrl', function() {
    var req, res, TeamMock;

    beforeEach(function() {
        res = httpMocks.createResponse();
        req = httpMocks.createRequest();
        TeamMock = sinon.mock(Team);
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
        var ID = 5;
        var findByIdExpectation = TeamMock.expects('findById');
        findByIdExpectation.once();
        findByIdExpectation.callsArgWith(1, null, { _id: ID, data: 'aa' });

        teamCtrl.read(req, res);

        var data = JSON.parse(res._getData());
        data.should.have.property('_id', ID);
        data.should.have.property('data', 'aa');

        TeamMock.verify();
    });

    it('should create a new team and return it', function () {
        var TEAM_NAME = 'Turtles';
        var team = new Team({ name: TEAM_NAME });

        // Expect new document creation
        var ctorExpectation = TeamMock.expects('Team');
        ctorExpectation.once();
        ctorExpectation.returns(team);
        // Expect the document to be saved
        var teamMock = sinon.mock(team);
        var saveExpectation = teamMock.expects('save');
        saveExpectation.once();
        saveExpectation.callsArgWith(0, null, team);

        teamCtrl.create(req, res);

        var data = JSON.parse(res._getData());
        data.should.have.property('name', TEAM_NAME);
        TeamMock.verify();
    });
});
