import {title, version} from '../package.json'
import {DefinePlugin} from 'webpack'

// noinspection JSUnusedGlobalSymbols
export default {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './'
    },
    entry: './src/main.ts',
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {test: /\.(png|jpg|mp3)$/, loader: 'file-loader'}
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.png', '.jpg', '.mp3']
    },
    output: {
        filename: 'index.js'
    },
    plugins: [
        new DefinePlugin({
            build: JSON.stringify('development'),
            title: JSON.stringify(title),
            version: JSON.stringify(version)
        })
    ]
}
