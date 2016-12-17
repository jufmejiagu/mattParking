var gulp = require("gulp");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var nib = require("nib");
var to5ify = require('6to5ify');

var rename = require("gulp-rename");
var concat = require("gulp-concat");
var stylus = require("gulp-stylus");
var uglify = require("gulp-uglify");
var webserver = require("gulp-webserver");
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');

function bundleScripts(watch) {

  var bundler = browserify('./app/js/main.js', {
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler
    .transform(to5ify.configure({
      only: /app/
    }));

  function rebundle() {

    var stream = bundler.bundle();
    var started = new Date().getTime();
    function endTime() {
      var s = ( new Date().getTime() - started ) / 1000;
      return 'Browserify finished ';
    }
    stream.on('end', function () {
      gutil.log(endTime());
    })

    stream.pipe(source('main.js'))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('dist/js'));
  }

  bundler.on('update', rebundle);

  return rebundle();
}

gulp.task('browserify', function () {
  return bundleScripts(false);
});

gulp.task('copy', function () {

  gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));

  gulp.src('app/assets/images/**.*')
    .pipe(gulp.dest('dist/assets/images'));

  gulp.src('app/assets/fonts/**/**/*.*')
    .pipe(gulp.dest('dist/assets/fonts'));

  gulp.src('app/assets/**.*')
  .pipe(gulp.dest('dist/assets'));

});

gulp.task('copy-release', function () {
  gulp.src('google*')
    .pipe(gulp.dest('dist'));

  gulp.src('app/index.html')
    .pipe(rename('r.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', function () {
  gulp.src('dist/js/bundle.js')
    .pipe(uglify())
    .pipe(stripDebug())
    .pipe(gulp.dest('dist/js/'))
});

//task for CSS pre-processor stylus
gulp.task('stylus', function () {
  gulp.src('app/assets/styles/main.styl')
    .pipe(stylus({
      use: nib(),
      compress: true,
      'include css': true
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('server', function () {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
      fallback: 'index.html',
      host: '0.0.0.0'
    }));
});


gulp.task('watch', function () {
  bundleScripts(true); // watchify
  gulp.watch('app/**/*.styl', ['stylus']);
  gulp.watch('app/**/*.html', ['copy']);
  gulp.watch('app/assets/images/*.*', ['copy']);
  gulp.watch('app/assets/*.*', ['copy']);

});

gulp.task('build', ['stylus', 'browserify', 'copy']);
gulp.task('dev', ['build', 'server', 'watch']);
gulp.task('release', ['build', 'copy-release', 'minify']);
