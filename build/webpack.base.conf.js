/* eslint-disable*/
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// const SpritesmithPlugin = require('webpack-spritesmith');
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
	test: /\.(js|vue)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [resolve('src'), resolve('test')],
	options: {
		formatter: require('eslint-friendly-formatter'),
		emitWarning: !config.dev.showEslintErrorsInOverlay
	}
})

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath :
			config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
		}
    },
	module: {
		rules: [
			...(config.dev.useEslint ? [createLintingRule()] : []),
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass",'sprite-loader']
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
    },
    //精灵图  PC端设置
 //    plugins: [
 //        new SpritesmithPlugin({
 //            // 目标小图标
 //            src: {
 //                cwd: path.resolve(__dirname, '../src/assets/icons'),
 //                glob: '*.png'
 //            },
 //            // 输出雪碧图文件及样式文件
 //            target: {
 //                image: path.resolve(__dirname, '../src/assets/sprites/sprite.png'),
 //                css: path.resolve(__dirname, '../src/assets/sprites/sprite.css')
 //            },
 //            // 样式文件中调用雪碧图地址写法
 //            apiOptions: {
 //                cssImageRef: '../sprites/sprite.png'
 //            },
 //            spritesmithOptions: {
 //                algorithm: 'top-down'
 //            }
 //        })
	// ],
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
}