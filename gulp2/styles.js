import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import pkg from '../package.json'


let _ = plugins({
	pattern: ["*"],
	scope: ["devDependencies"]
});

const cssnextConfig = {
	warnForDuplicates: false,
	browsers: [
    '> 1%',
    'IE 10'
  ],
  features: {
    customProperties: false
  }
}

const postCSS = [
	_.postcssEasyImport(),
	_.postcssUrl,
	_.rucksackCss(),
	_.postcssCssnext(cssnextConfig),
	_.postcssReporter({ clearMessages: true })
]

function styles() {
	return gulp.src(pkg.css.src + pkg.css.filename)
		.pipe(_.plumber())
		.pipe(_.sourcemaps.init())
		.pipe(_.postcss(postCSS))
		.pipe(_.size({gzip: true, showFiles: true}))
		.pipe(_.sourcemaps.write('.'))
		.pipe(gulp.dest(pkg.css.dest))
}

function stylesMinify() {
	return gulp.src(pkg.css.dest + pkg.css.filename)
		.pipe(_.plumber())
		.pipe(_.postcss([
			_.cssnano({reduceIdents: {gridTemplate: false}})
		]))
		.pipe(_.rename('styles.min.css'))
		.pipe(_.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.css.dest))
}

function fontface(){
	return gulp.src(pkg.css.src + pkg.css.fontface)
		.pipe(_.plumber())
		.pipe(_.postcss(postCSS))
		.pipe(gulp.dest(pkg.css.inline))
}

function critical(){
	return _.critical.generate({
		inline: false,
		src: pkg.urls.dev,
		dest: pkg.css.inline + pkg.css.critical.filename,
		css: [
			pkg.css.dest + pkg.css.filename
		],
		minify: true,
		width: 1300,
		height: 900
	});
}

gulp.watch( pkg.css.src + '**/*.css', styles)

module.exports = { styles, critical }
