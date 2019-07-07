// const webpack = require('webpack-stream')

module.exports = {
    mode: 'development',
    entry:  {
        index: './src/js/index'
    },
    output: {
        filename: '[name].js'
    },
    devtool:  'source-map',
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
