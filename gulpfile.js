let

	gulp = require('gulp'),
	newer = require('gulp-newer'),
	imagemin = require('gulp-imagemin'),
	htmlclean = require('gulp-htmlclean'),
	concat = require('gulp-concat'),
	deporder = require('gulp-deporder'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  browserSync = require('browser-sync').create()

	devBuild = (process.env.NODE_ENV !== 'production'),

	folder = {
		src: 'src/',
		build: 'build/'
	}
	;


// Static server
gulp.task('serve', function() {

    browserSync.init({
        server: folder.build
    });

    gulp.watch(folder.src+"**/*").on('change', browserSync.reload);
});

// image processing

gulp.task('imgs', function(){
	let out = folder.build + 'imgs/';
	return gulp.src(folder.src+'imgs/**/*')
	.pipe(newer(out))
	.pipe(imagemin({optimizationLevel:5}))
	.pipe(gulp.dest(out));
});


// HTML processing
gulp.task('html', ['imgs'], function() {
  let
    out = folder.build;
    return gulp.src(folder.src+"*.html")
    .pipe(newer(out))
    .pipe(htmlclean())
    .pipe(gulp.dest(out));
});


// JS processing

gulp.task('js', function(){
	let out = folder.build + 'js/';
	return gulp.src(folder.src + 'js/**/*')
	.pipe(deporder())
	.pipe(concat('main.js'))
	.pipe(stripdebug())
	.pipe(uglify())
	.pipe(gulp.dest(out));
});

// CSS processing
gulp.task('css', ['imgs'], function() {

  var postCssOpts = [
  assets({ loadPaths: ['imgs/'] }),
  autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
  mqpacker
  ];

  if (devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + 'scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      imagePath: 'imgs/',
      precision: 3,
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(postcss(postCssOpts))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(folder.build + 'css/'))
    .pipe(browserSync.stream());

});


// run all tasks
// gulp.task('run', ['serve']);

// watch for changes
gulp.task('watch', function() {

  // image changes
  gulp.watch(folder.src + 'imgs/**/*', ['imgs']);

  // html changes
  gulp.watch(folder.src + '*.html', ['html']);

  // javascript changes
  gulp.watch(folder.src + 'js/**/*', ['js']);

  // css changes
  gulp.watch(folder.src + 'scss/**/*', ['css']);

});


gulp.task('default', ['serve','watch']);
