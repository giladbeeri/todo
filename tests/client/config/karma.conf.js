var bowerPath = function(relative) { return 'public/bower_components' + relative; };

module.exports = function(config){
    config.set({
    basePath : '../../../',

    files : [
      bowerPath('/angular/angular.js'),
      bowerPath('/angular/angular-*.js'),
      'tests/client/lib/angular/angular-mocks.js',
      'public/js/**/*.js',
      'tests/client/test/unit/**/*.js'
    ],

    exclude : [
      bowerPath('/angular/angular-loader.js'),
      bowerPath('/angular/*.min.js'),
      bowerPath('/angular/angular-scenario.js')
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    logLevel: LOG_DEBUG,

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
