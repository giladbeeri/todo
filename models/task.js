var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var Task = new Schema({
            content: String,
            owner: String, 
            done: { type: Boolean, default: false },
            creation_date: { type: Date, default: Date.now },
            due_date: Date
            });

module.exports = mongoose.model('Task', Task);
