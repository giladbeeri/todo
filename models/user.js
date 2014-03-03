var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    plm = require('passport-local-mongoose');
    
var User = new Schema({
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true }
});

User.plugin(plm);

module.exports = mongoose.model('User', User);
