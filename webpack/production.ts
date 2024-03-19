import path from 'path'
import {DefinePlugin, ProvidePlugin} from 'webpack'
import {CleanWebpackPlugin} from "clean-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import {title, version} from '../package.json'

// noinspection JSUnusedGlobalSymbols
export default {
    mode: 'production',
    entry: {
        app: './src/main.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
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
        alias: {
            'res': path.resolve(__dirname, '../res'),
        },
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js',
        clean: true,
    },
    plugins: [
        // https://stackoverflow.com/a/54273230/909169
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'index.html',
                    context: './'
                },
                {
                    from: 'index.css',
                    context: './'
                },
                {
                    from: 'res/',
                    to: 'res/'
                },
            ]
        }),
        new ProvidePlugin({
            PIXI: 'pixi.js'
        }),
        new DefinePlugin({           
            build: JSON.stringify('production'),
            title: JSON.stringify(title),
            version: JSON.stringify(version),
        }),
    ]
}
