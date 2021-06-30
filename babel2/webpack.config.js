const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
							[
							  '@babel/preset-env',
							  {
								corejs : {
								  version : "3",
								  proposals : true
								},
								useBuiltIns: 'entry',
								targets: {
								  browsers: [
									"edge >= 16",
									"safari >= 9",
									"firefox >= 57",
									"ie >= 11",
									"ios >= 9",
									"chrome >= 49"
								  ]
								}
							  }
							]
						],
						plugins: [
							["@babel/plugin-transform-regenerator"],
							["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
							["@babel/plugin-proposal-class-properties", { "loose": true }]							
						]
                    }
                }
            }
        ]
    },
}