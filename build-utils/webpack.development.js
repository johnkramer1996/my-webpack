module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.module.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[name]_[local]_[hash:base64:5]',
                            modules: true,
                            sourceMap: false,
                        },
                    },
                ],
            },
            {
                test: /\.sa?css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
})
