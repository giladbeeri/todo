// Check Drywall, a complete user management library based on passport

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    plm = require('passport-local-mongoose');
    
var User = new Schema({
    /* Unecessary because the plugin adds username, hash and salt.
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true }
    */
});

User.plugin(plm, { usernameLowerCase: true });

// This is an ugly patch to a problem with mongoose testing that I couldn't find a solution for.
// See https://github.com/LearnBoost/mongoose/issues/1251.
try {
    module.exports = mongoose.model('User', User);
} catch(err) {
    module.exports = mongoose.model('User');
}
