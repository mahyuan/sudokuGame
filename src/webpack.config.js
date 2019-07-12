module.exports = {
    mode: 'development',
    entry:  {
        index: './js/index'
    },
    output: {
        filename: '[name].js'
    },
    devtool:  'source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                },
                    'ts-loader'
                ],
                exclude: /node_modules/
            }
        ]
    }
}
