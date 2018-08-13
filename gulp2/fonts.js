import gulp from 'gulp'
import pkg from '../package.json'

//Consider:
// https://github.com/jonathantneal/postcss-font-magician

function fonts(){
	return gulp.src(pkg.fonts.src + pkg.fonts.glob)
		.pipe(gulp.dest(pkg.fonts.dest))
}

module.exports = { fonts }
