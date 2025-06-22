const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

const config = {
  siteTitle: 'Ba Thien Thu Nguyen | My Portfolio',
  linkedin: 'https://www.linkedin.com/in/your-profile',
  email: 'thaliaincanada@gmail.com',
  cv: 'https://cv',
};

// File paths
const paths = {
  src: {
    html: 'src/**/*.html',
    partials: 'src/partials/**/*.html',
  },
  dist: './',
};

// HTML task - processes includes and copies to dist
gulp.task('html', function () {
  return gulp
    .src(['src/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(replace('__SITE_TITLE__', config.siteTitle))
    .pipe(replace('__LINKEDIN__', config.linkedin))
    .pipe(replace('__EMAIL__', config.email))
    .pipe(replace('__CV__', config.cv))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

// Browser Sync task - starts local server with live reload
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: paths.dist,
    },
    port: 3000,
  });
});

// Watch task - watches for changes and triggers rebuilds
gulp.task('watch', function () {
  gulp.watch([paths.src.html, paths.src.partials], gulp.series('html'));
});

// Default task - runs all tasks and starts watching
gulp.task('default', gulp.series('html', gulp.parallel('serve', 'watch')));
