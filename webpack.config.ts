import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import globby from 'globby';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import HardSourcePlugin from 'hard-source-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';

const baseConfig: webpack.Configuration = {
	mode: isProd ? 'production' : 'development',
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.json'],
	},
	devtool: isProd ? undefined : 'cheap-source-map',
	plugins: [
		new HardSourcePlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	],
};

const tsLoader = {
	loader: 'ts-loader',
	options: {
		transpileOnly: true,
	},
};

const browserConfig = (name: string) => {
	const entry = globby
		.sync(`./src/${name}/pages/*.tsx`)
		.reduce<Record<string, string>>((prev, curr) => {
			prev[path.basename(curr, '.tsx')] = curr;
			return prev;
		}, {});
	return merge(baseConfig, {
		name,
		target: 'web',
		entry,
		output: {
			path: path.resolve(__dirname, name),
			filename: 'js/[name].js',
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loaders: ['babel-loader', tsLoader],
				},
				{
					test: /\.(png|woff2?|svg)$/,
					loaders: [
						{
							loader: 'file-loader',
							options: {
								name: 'img/[name].[ext]',
							},
						},
					],
				},
				{
					test: /\.css$/,
					loaders: [
						isProd ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),
			...Object.keys(entry).map(
				(entryName) =>
					new HtmlWebpackPlugin({
						filename: `${entryName}.html`,
						chunks: [entryName],
						title: entryName,
						template: `src/webpack-templates/${name}.html`,
					}),
			),
			new BundleAnalyzerPlugin({
				openAnalyzer: false,
				analyzerMode: 'static',
				reportFilename: path.resolve(
					__dirname,
					`bundle-analyzer/${name}.html`,
				),
			}),
		],
		optimization: {
			splitChunks: {
				chunks: 'all',
				cacheGroups: {
					common: {
						minChunks: 2,
					},
					vendors: false,
					default: false,
				},
			},
		},
	});
};

const extensionConfig: webpack.Configuration = merge(baseConfig, {
	name: 'extension',
	target: 'node',
	entry: path.resolve(__dirname, 'src/extension/index.ts'),
	output: {
		path: path.resolve(__dirname, 'extension'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [tsLoader],
			},
		],
	},
	externals: [nodeExternals()],
});

export default [
	browserConfig('dashboard'),
	browserConfig('graphics'),
	extensionConfig,
];
