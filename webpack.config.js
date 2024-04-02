const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		"event-countdown-banner": path.resolve(__dirname, "src/page-header.js"),
		"admin/admin-page": path.resolve(__dirname, "src/admin/admin-page.js"),
		"components/display-banner": path.resolve(
			__dirname,
			"src/components/display-banner.js",
		),
		"admin/colour-picker": path.resolve(
			__dirname,
			"src/admin/colour-picker.js",
		),
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: "asset/resource",
				generator: {
					filename: "images/[hash][ext][query]",
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
			new CssMinimizerPlugin(),
		],
	},
};
