var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint');

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
    return gulp.src('app/**/*.js')
         .pipe(jshint())
         .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('watch', function() {
    gulp.watch('**/*.js', ['jshint']);
});

