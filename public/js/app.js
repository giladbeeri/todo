var todoApp = angular.module('todoApp', ['ui.select2', 'xeditable', 'todoControllers']);

todoApp.constant('config', {
    taskListUrl: '/tasks/'
});

todoApp.run(function(editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
});
