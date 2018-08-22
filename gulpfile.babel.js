'use strict';

import path from 'path';
import gulp from 'gulp';



import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
//import {output as pagespeed} from 'psi';
import pkg from './package.json';

const plugins = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('clean',()=>{

})

gulp.task('style',()=>{
	const AUTOPREFIXER_BROWSERS = [
		'ie >= 8',
		'ie_mob >= 10',
		'ff >= 20',
		'chrome >= 24',
		'safari >= 7',
		'opera >= 23',
		'ios >= 7',
		'android >= 4.4',
		'bb >= 10'
	];
	return gulp.src([
		'dev/scss/**/*.scss'
	])
	.pipe(plugins.sass())
	.pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe(gulp.dest('dev/css'))
	.pipe(plugins.cssnano())
	.pipe(gulp.dest('dist/css'))
});

gulp.task('script',()=>{
	console.log('script');
});

gulp.task('images',()=>{
	console.log('image');
});

gulp.task('html',()=>{
	console.log('html');
});

gulp.task('default',()=>{
	runSequence('style', 'script', 'images', 'html')
});

gulp.task('serve', ['script','style'], ()=>{
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['dev'],
    port: 4000
  });

  gulp.watch(['dev/**/*.html'],[reload])
  gulp.watch(['dev/scss/**/*.scss'],['style', reload])

})