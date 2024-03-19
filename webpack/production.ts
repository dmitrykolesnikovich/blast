import path from 'path'
import {DefinePlugin} from 'webpack'
import CopyPlugin from "copy-webpack-plugin"
import {title, version} from '../package.json'

// noinspection JSUnusedGlobalSymbols
export default {
    mode: 'production',
    entry: './src/main.ts',
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
            {test: /\.(png|jpg|mp3)$/, loader: 'file-loader'}
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.png', '.jpg', '.mp3'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../build'),
    },
    plugins: [
        new DefinePlugin({
            build: JSON.stringify('production'),
            title: JSON.stringify(title),
            version: JSON.stringify(version),
        }),
        new CopyPlugin({
            patterns: [
                {from: './*.(html|css)'},
            ]
        })
    ]
}
