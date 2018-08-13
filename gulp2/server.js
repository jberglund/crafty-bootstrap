import gulp from 'gulp'
import Browser from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import { config as webpackConfig } from './webpack'

import pkg from '../package.json'


const browser = Browser.create()
const bundler = webpack(webpackConfig)

export function server() {
	let config = {
		proxy: {
			target: pkg.urls.dev,
			middleware: [
				webpackDevMiddleware(bundler, {
					stats: { 
						colors: true,
						performance: false,
						modules: false,
					},
					publicPath: webpackConfig.output.publicPath
				}),
				webpackHotMiddleware(bundler)
			]
		},
		port: 9999,
		open: false
	}

	browser.init(config)

  return browser.watch('./web/assets/css/styles.css', (event, file) => { 
    // @TODO: Speed up this. Taking too long for a refresh.
    if ( event === 'change' ){
      browser.reload('styles.css')
    }
  })

}
