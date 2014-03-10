var Urls = {};
var Const = {};
Object.defineProperty(Const, 'TASK_ID_PARAM', { value: 'task_id'});

Object.defineProperty(Urls, 'ROOT', {value: '/'});
Object.defineProperty(Urls, 'TASK_LIST', {value: Urls.ROOT + 'tasks'});
Object.defineProperty(Urls, 'TASK', {value: Urls.TASK_LIST + '/:' + Const.TASK_ID_PARAM });

exports.Const = Const;
exports.Urls = Urls;

