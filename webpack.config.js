var path = require("path");
var webpack = require("webpack");

module.exports = {
	devtool: '#source-map',
	entry: [
		'./index.js',
		'webpack/hot/poll?1000'
	],
	output: {
		path: path.join(__dirname, "out"),
		libraryTarget: 'commonjs2',
		filename: "bundle.js"
	},
	module: {
    	loaders: [
    		{test: /\.js$/, loaders: ['express-hot-reload', 'babel-loader'], exclude: /node_modules/}
    	]

  	},
	externals: /^[a-z][a-z\.\-0-9]*$/,
	target: "node",
	plugins:[new webpack.NoErrorsPlugin()]
};
