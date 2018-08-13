import gulp from 'gulp'
import path from 'path'
import pkg from '../package.json'

import plumber from 'gulp-plumber'
import size from 'gulp-size'
import newer from 'gulp-newer'
import svgmin from 'gulp-svgmin'
import svgstore from 'gulp-svgstore'
import rename from 'gulp-rename'


export function svg(){
	return gulp.src(pkg.svg.src + '**/*.svg')
		.pipe(plumber())
		.pipe(newer(pkg.svg.dest + pkg.svg.output))
		.pipe(svgmin( file => {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [
					{ removeComments: true },
					{ removeDoctype: true },
					{ removeXMLNS: true },
					{ cleanupIDs: { prefix: prefix + '-', minify: true } },
					{ cleanupNumericValues: { floatPrecision: 2 } }
				]
			}
		}))
		.pipe(size({gzip: true, showFiles: true}))
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(rename(pkg.svg.output))
		.pipe(gulp.dest(pkg.svg.dest))
}

gulp.watch( pkg.svg.src + '**/*.svg', svg)

