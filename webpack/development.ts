import {title, version} from '../package.json'
import {DefinePlugin} from 'webpack'
import * as path from "path"

// noinspection JSUnusedGlobalSymbols
export default {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/main.ts',
    output: {
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {test: /\.(png|jpg|mp3)$/, loader: 'file-loader', options: {name: '[path][name].[ext]'}}
        ]
    },
    plugins: [
        new DefinePlugin({
            manifest: {
                build: JSON.stringify('development'),
                title: JSON.stringify(title),
                version: JSON.stringify(version)
            }
        })
    ],
    devServer: {
        static: [
            {
                publicPath: '/',
                directory: path.join(__dirname, '../public')
            },
            {
                publicPath: '/res',
                directory: path.join(__dirname, '../res')
            }
        ],
        port: 8080
    },
}
