import {title, version} from '../package.json'
import {DefinePlugin} from 'webpack'
import CopyPlugin from "copy-webpack-plugin"

// noinspection JSUnusedGlobalSymbols
export default {
    mode: 'production',
    devtool: 'source-map',
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
            {test: /\.(png|jpg|mp3)$/, loader: 'file-loader', options: {name: '[path][name].[ext]', emitFile: false}}
        ]
    },
    plugins: [
        new DefinePlugin({
            build: JSON.stringify('production'),
            title: JSON.stringify(title),
            version: JSON.stringify(version)
        }),
        new CopyPlugin({
            patterns: [
                {from: './public', to: './'},
                {from: './gen', to: './res'}
            ]
        })
    ]
}
