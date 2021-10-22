const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


const mode = process.env.NODE_ENV;
const isDev = mode === 'development';


const filename = ext => isDev ?
	`[name].${ext}` :
	`[name].[fullhash].${ext}`

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	};

	if (!isDev) {
		config.minimizer = [
			new CssMinimizerPlugin(),
			new TerserPlugin()
		]
	}

	return config;
}

module.exports = {
	context: path.resolve(__dirname, ''),  // указание на папку исходных файлов
	entry: {
		main: './js/index.js'
	},
	output: {
		filename: `js/${filename('js')}`,
		path: path.resolve(__dirname, 'build'),
		environment: {
			arrowFunction: false,
		},
	},
	mode,
	resolve: {
		extensions: ['.js', '.css', '.scss', '.json', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'],
		alias: {
			'@': path.resolve(__dirname, '')
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `css/${filename('css')}`
		}),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					// Lossless optimization (оптимизация БЕЗ потери качества jpg/png)
					// ['gifsicle', { interlaced: true }],
					// ['jpegtran', { progressive: true }],
					// ['optipng', { optimizationLevel: 5 }],
					// ['svgo', { plugins: [{ removeViewBox: false }] }],

					// Lossy optimization (оптимизация С потерей качества jpg/png)
					['gifsicle', { interlaced: true }],
					['mozjpeg', { quality: 95 }],
					['pngquant', [0.5, 0.5]],
					//['svgo', { plugins: [{ removeViewBox: false }] }],
					['webp', {quality: 50}]
				],
			},
		}),

	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader',
						options: { url: false, importLoaders: 1 }
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
											// Options
											browsers: 'last 5 versions',
											//autoprefixer: { grid: true }
										},
									],
								],
							},
						},
					},
				]
			},
			{
				test: /\.(png|jpe?g|svg|gif|webp)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],

			},
		]
	},
	optimization: optimization(),
	devtool: isDev && 'source-map'
}
