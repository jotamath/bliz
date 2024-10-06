const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify'); // Adiciona uglify

// Função de compilar o scss, autoprefixer e livereload
function compilaSass() {
    return gulp.src('scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        cascade: false,
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}
// Tarefa do scss
gulp.task('sass', compilaSass);

// Função de compilar e minificar JS
function gulpJS() {
    return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify()) // Corrige chamada para uglify
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}
// Tarefa do JS
gulp.task('alljs', gulpJS);

// Função do browserSync
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

// Tarefa do browserSync
gulp.task('browser-sync', browser);

// Função do watch
function watch() {
    gulp.watch('scss/*.scss', compilaSass);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/scripts/*.js', gulpJS); // Corrige o caminho de .js
}
// Registrar tarefa do watch
gulp.task('watch', watch);

// Tarefa do default
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'alljs'));
