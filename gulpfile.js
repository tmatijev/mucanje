// Include gulp
const gulp = require('gulp')
// Define base folders
const resources = 'resources/'
const dest = 'public/'

// Include plugins
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sass = require('gulp-ruby-sass')
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const autoprefixer = require('gulp-autoprefixer')

// ************************************************ //
// --- JavaScript files
// ************************************************ //

// Javascript
// const jsFiles = [
//     'resources/js/vendor/right-height.js',
//     'resources/js/app.js'
// ];

const cssFiles = [
  'public/css/fonts.css',
  'public/css/styles.css',
  'node_modules/flexboxgrid/css/flexboxgrid.css'
]

// ************************************************ //
// --- Minimized and for showcase
// ************************************************ //

// gulp.task('scripts', function() {
//   gulp.src(jsFiles)
//     .pipe(concat('script.js'))
//     .pipe(gulp.dest('./public/js/'))
// });

gulp.task('sass', () =>
  sass('resources/stylesheets/styles.sass')
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('public/css'))
    .on('end', () => {
      gulp.src(cssFiles)
        .pipe(concat('stylesheets.css'))
        .pipe(gulp.dest('public/css/'))
    })
)

// ************************************************ //
// --- Directly for production
// ************************************************ //

gulp.task('sass-production', function() {
  return sass('resources/stylesheets/styles.sass').pipe(
    gulp.dest('public/production/css')
  )
})

// gulp.task('scripts-production', function() {
//     gulp.src(jsFiles)
//         .pipe(concat('script.js'))
//         .pipe(gulp.dest('./production/js/'))
// });

// ************************************************ //
// --- Watchers
// ************************************************ //

gulp.task('watch', function() {
  // Watch .js files
  // gulp.watch(resources + 'js/*.js', ['scripts']);
  // Watch .scss files
  gulp.watch(resources + 'stylesheets/*.sass', ['sass'])
  gulp.watch(resources + 'stylesheets/modules/*.sass', ['sass'])
  gulp.watch(resources + 'stylesheets/config/*.sass', ['sass'])
  gulp.watch(resources + 'stylesheets/helpers/*.sass', ['sass'])
})

// ************************************************ //
// --- Executors
// ************************************************ //

// Default Task
// gulp.task('dev', ['scripts', 'sass', 'watch']);
gulp.task('dev', ['sass', 'watch'])

// Production Task
// gulp.task('production', ['scripts-production', 'sass-production']);