import path from 'path'
import {DefinePlugin, ProvidePlugin} from 'webpack'
import {title, version} from '../package.json'

export default {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './',
        port: 1234
    },
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(mp3|wav)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/sounds',
                },
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.css', '.png', '.mp3'],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js',
        clean: true,
    },
    plugins: [
        new ProvidePlugin({
            PIXI: 'pixi.js'
        }),
        new DefinePlugin({
            build: JSON.stringify('development'),
            title: JSON.stringify(title),
            version: JSON.stringify(version),
        })
    ],
}
