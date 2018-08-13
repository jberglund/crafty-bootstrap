import gulp from 'gulp'
import path from 'path'
import webpack from 'webpack'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

import { projectPath } from './helpers'

import rename from 'gulp-rename'
import size from 'gulp-size'
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber'
import newer from 'gulp-newer'

const pkg = require("../package.json");
const isProduction = (process.env.NODE_ENV === 'production')

export let config = {
  mode: process.env.NODE_ENV,
	entry: {
		main: [
			pkg.js.entry,
      ...(isProduction ? [] : ['webpack/hot/dev-server'])
		]
	},

	context: path.resolve(__dirname, '../' + pkg.js.src),

	output: {
		path: path.resolve(__dirname, '../' + pkg.js.dest),
		filename: pkg.js.output,
		chunkFilename: '[id].bundle.js',
    publicPath: '/assets/js/'
	},

	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		}
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [['es2015', {modules: false}]],
						plugins: ['syntax-dynamic-import']
					},
				}],
			}
		],
	},

  devtool: isProduction ? "cheap-module-source-map" : "cheap-module-eval-source-map",

  optimization: {
    minimizer: [
		//https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					arrows: false,
					booleans: false,
					collapse_vars: false,
					comparisons: false,
					computed_props: false,
					hoist_funs: false,
					hoist_props: false,
					hoist_vars: false,
					if_return: false,
					inline: false,
					join_vars: false,
					keep_infinity: true,
					loops: false,
					negate_iife: false,
					properties: false,
					reduce_funcs: false,
					reduce_vars: false,
					sequences: false,
					side_effects: false,
					switches: false,
					top_retain: false,
					toplevel: false,
					typeofs: false,
					unused: false,
					// Switch off all types of compression except those needed to convince
					// react-devtools that we're using a production build
					conditionals: true,
					dead_code: true,
					evaluate: true,
				},
				mangle: true,
        sourceMap: false
			}
		})
    ]
  },
	plugins: isProduction ? [] : [
		new webpack.HotModuleReplacementPlugin()
	]
}

export function scripts() {

	return new Promise(resolve => webpack(config, (err, stats) => {

		if (err) console.log('Webpack', err)

		if(isProduction){
			console.log(stats.toString({
				colors: true,
				performance: true
			}))
		}
		resolve()
	}))
}

export function inline(){
	return gulp.src(pkg.js.inline.src, {since: gulp.lastRun(inline)})
		.pipe(plumber())
		.pipe(newer(pkg.js.inline.path))
		.pipe(uglify())
		.pipe(size({gzip: true, showFiles: true}))
		.pipe(rename( function(path) {
			var filename = path.basename.toString().toLowerCase();
			path.basename = filename + '.min';
		}))
		//.pipe(size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.js.inline.path))
}

//gulp.watch(pkg.js.src + '**/*.js', scripts)

//module.exports = { config, scripts }
