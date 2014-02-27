var todoApp = angular.module('todoApp', ['xeditable', 'todoControllers']);

todoApp.constant('config', {
    taskListUrl: '/todo/'
});

todoApp.run(function(editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
});
