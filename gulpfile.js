const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

function styles() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())

        .pipe(autoprefixer({

            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))

        .pipe(cleanCSS({level: 2}))

        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());

}

function clean() {
    return del(['dist/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./scss/**/*.scss', styles)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('del', clean);
gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean,styles));
gulp.task('dev', gulp.series('build','watch'));