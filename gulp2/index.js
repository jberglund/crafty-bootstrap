import gulp from 'gulp'

import { styles }  from './styles'
import { scripts, inline } from './webpack'
import { server }  from './server'
import { svg }  from './svg'
import { fonts }  from './fonts'


//export const dev		= gulp.series( server, styles)
//export const build	= gulp.series( scripts )
//export default build

export const dev = gulp.series( gulp.parallel(styles, svg, server, scripts, inline, fonts) );
export const build = gulp.series( gulp.parallel(styles, svg, scripts) );

export default dev; 
