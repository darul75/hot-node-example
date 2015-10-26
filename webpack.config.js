var path = require("path");
module.exports = {
	entry: {
		main: "./index.js"
	},
	output: {
		path: path.join(__dirname, "out"),
		libraryTarget: 'commonjs2',
		filename: "bundle.js"
	},
	module: {
    	// devtool: 'source-map',
    	preLoaders: [
      	/*{test: /\.js$/, loader: "./test-loader", exclude: /node_module/},*/
      		{test: /\.js$/, loader: "./loader", exclude: /node_module/}
    	]
  	},
	externals: /^[a-z][a-z\.\-0-9]*$/,
	target: "node"
};
