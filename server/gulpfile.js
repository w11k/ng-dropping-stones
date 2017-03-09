var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var debug = require('gulp-debug');
var cache = require('gulp-cached');
var remember = require('gulp-remember');

gulp.task('lint', function () {

    var s = gulp.src('src/**/*.js');
    s = s.pipe(cache('js'));
    s = s.pipe(debug());
    s = s.pipe(jshint());
    s = s.pipe(jshint.reporter('jshint-stylish'));
    s = s.pipe(remember('js'));

    return s
});


'use strict';

var _ = require("lodash");
var del = require('del');
var merge = require('merge2');
var sequence = require('run-sequence');


var gulpDebug = require('gulp-debug');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var addsrc = require('gulp-add-src');


var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var source = require("vinyl-source-stream");

var Config = require('./gulpfile.config');
var config = new Config();

var developmentMode = false;
var targetApp = undefined;


// ------------------------------------------------------------------
// clean
// ------------------------------------------------------------------

gulp.task('clean', function () {
    try {
        del.sync([config.target]);
    } catch (e) {
        if (developmentMode) {
            console.log(e);
        }
        else {
            throw e;
        }
    }
});


var tsProject = ts.createProject('tsconfig.json');

gulp.task('copy:ejs', function () {
    gulp.src('src/views/**/*.*')
        .pipe(gulp.dest('target/views'));
});

gulp.task('build:ts', function () {

    var tsResult = gulp.src(['src/*.ts', 'src/**/*.ts']);
    tsResult = tsResult.pipe(addsrc('./typings/index.d.ts'));
    tsResult = tsResult.pipe(sourcemaps.init());
    tsResult = tsResult.pipe(ts(tsProject));
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest('target/definitions')),
        tsResult.js.pipe(gulp.dest('target/')).pipe(sourcemaps.write())
    ]);

});


gulp.task('watch', function () {
    developmentMode = true;
    gulp.watch(config.typeScriptFiles, {cwd: "src"}, ["build:ts"]);
    gulp.watch('views/**/*.*', {cwd: "src"}, ["copy:ejs"]);
});

gulp.task('dev', function (callback) {

    config.targetJs = config.targetApp;

    developmentMode = true;
    sequence(
        //"clean",
        ["build:ts"],
        //"build:html",
        callback);
});

gulp.task('nodemon', function () {
    nodemon({
        script: './target/server.js',
        ext: 'js',
        env: {'NODE_ENV': 'development'},
        delay: 300
    })
        .on('restart', function () {
            console.log('restarted!')
        })
});


gulp.task('default', ["watch", "build:ts", "copy:ejs", "nodemon"]);


var onError = function (err) {
    gutil.log(
        gutil.colors.red.bold('[ERROR:' + err.plugin + ']:'),
        gutil.colors.bgRed(err.message),
        gutil.colors.red.bold('in:' + err.fileName)
    );
    this.emit('end');
};

function debug(config) {
    if (developmentMode) {
        return gutil.noop();
    } else {
        return gulpDebug(config);
    }
}


gulp.task('dist', ["build:ts", "copy:ejs"]);
