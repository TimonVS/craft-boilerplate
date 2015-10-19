// TODO: add Sass linting

import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import minifycss from 'gulp-minify-css';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'
import config from './gulp.config.js';

const reload = function (done) {
  browserSync.reload();
  done();
};

gulp.task('styles', function () {
  gulp.src(config.paths.css.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.css.dest))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('js-lint', function() {
  gulp.src(config.paths.js.src)
    .pipe(jshint())
});

gulp.task('scripts', function() {
  gulp.src(config.paths.js.src)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.paths.js.dest))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.js.dest));
});

gulp.task('image-min', function () {
  return gulp.src(config.paths.img.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.paths.img.dest));
});

gulp.task('fonts', function() {
  gulp.src(config.paths.fonts.src)
    .pipe(gulp.dest(config.paths.fonts.dest));
});

gulp.task('clean', function(done) {
  return del(config.paths.dist, done)
});

gulp.task('watch', function() {

  browserSync({
    notify: false,
    port: 9000,
    proxy: {
      target: 'localhost:8080'
    }
  });

  gulp.watch([].concat(
    config.paths.html.src,
    config.paths.css.watch,
    config.paths.js.watch,
    config.paths.img.watch)).on('change', reload);

  // Watch .scss files
  gulp.watch(config.paths.css.watch, ['styles']);

  // Watch .js files to lint and build
  gulp.watch(config.paths.js.watch, ['js-lint', 'scripts']);

  // Watch image files
  gulp.watch(config.paths.img.watch, ['image-min']);

});

gulp.task('default', ['styles', 'js-lint', 'scripts', 'fonts', 'image-min', 'watch']);
