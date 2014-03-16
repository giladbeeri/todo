var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore');

var Team = new Schema(
    {
        name: { type: String, required: true, unique: true, index: true },
        members: [{ type: Schema.Types.ObjectId, ref: 'User'}]
    });

Team.methods.addMembers = function (members, cb) {
    this.members = _.union(this.members, members);
    this.save(cb);
};

// This is an ugly patch to a problem with mongoose testing that I couldn't find a solution for.
// See https://github.com/LearnBoost/mongoose/issues/1251.
try {
    module.exports = mongoose.model('Team', Team);
} catch(err) {
    module.exports = mongoose.model('Team');
}