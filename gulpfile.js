var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var glob = require('glob').sync;
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');

var pkg = require('./package.json');
var target = './build/';

gulp.task('default', ['build-tests'], function (argument) {
    gulp.watch(['src/*.js', 'src/*/*.js', 'test/*.test.js', 'test/*/.test.js'], ['build-tests']);
})

gulp.task('build-tests', function () {
    var t = browserify(glob('./test/*.test.js'), {debug: true})
    t.bundle()
        .on('error', gutil.log)
        .pipe(source('tests.js'))
        .pipe(gulp.dest(target));
});

gulp.task('build', function () {
    var t = browserify('./src/main.js', {debug: true, standalone: 'Essayist'})
    t.bundle()
        .on('error', gutil.log)
        .pipe(source('essayist.js'))
        .pipe(gulp.dest(target));
});

gulp.task('clean', function () {
    gulp.src(target, {read: false}).pipe(clean());
});
