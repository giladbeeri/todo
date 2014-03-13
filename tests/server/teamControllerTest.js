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

    it('should read all teams', function () {
        var findExpectation = TeamMock.expects('find');
        findExpectation.once();
        // Call the callback with (null, defaultTasks)
        findExpectation.callsArgWith(0, null, ['aa', 'bb']);
        teamCtrl.readAll(null, res);
        var data = JSON.parse(res._getData());
        data.should.have.length(2);

        TeamMock.verify();
    });
});
