/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env)

module.exports = ({ mode, serve } = { mode: 'production', serve: false }) => {
    const plugins = [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new webpack.HotModuleReplacementPlugin(),
    ]

    if (serve === 'true') {
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    return merge(
        {
            plugins,
            mode,
            entry: './src/index.tsx',
            devServer: {
                hot: true,
                open: true,
                compress: true,
                port: 8086,
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.jsx', '.js'],
                plugins: [new TsConfigPathsPlugin()],
            },
            output: {
                publicPath: '/',
                assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js|ts)x?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|ico)$/i,
                        type: mode === 'production' ? 'asset' : 'asset/resource',
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf)$/i,
                        type: 'asset/resource',
                    },
                ],
            },
        },
        modeConfiguration(mode)
    )
}
