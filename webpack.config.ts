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
	devtool: 'cheap-source-map',
	plugins: isProd ? [] : [new HardSourcePlugin()],
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
					loaders: [
						'babel-loader',
						{
							loader: 'ts-loader',
							options: {configFile: `tsconfig.${name}.json`},
						},
					],
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
						minChunks: Math.max(Object.keys(entry).length, 2),
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
				loaders: [
					{
						loader: 'ts-loader',
						options: {configFile: 'tsconfig.extension.json'},
					},
				],
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
