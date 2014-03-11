var Const = require('../../common/common').Const,
    mongoose = require('mongoose'),
    Task = require('../../models/task');


var now = new Date();
var tasks = [
    { content: 'Hello', owner: 'yes', due_date: new Date(2014, 4, 15)},
    { content: 'Finish him!', owner: 'user1', due_date: new Date(2014, 4, 17)},
    { content: 'Talk to him!', owner: 'user1', due_date: now },
    { content: 'HiHiHi', owner: 'user2', due_date: now },
];

mongoose.connect(Const.DB_URI);

tasks.forEach(function (task) {
    var t = new Task(task);
    t.save(function (err) {
        if (err) { console.log(err); }
        else {
            console.log('Saved:', t);
        }
    });
});

//mongoose.disconnect();

//process.exit(0);
