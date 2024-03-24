import {title, version} from '../package.json'
import {DefinePlugin} from 'webpack'
import CopyPlugin from "copy-webpack-plugin"
import path from "path"
import fs from "fs"

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
            manifest: {
                build: JSON.stringify('production'),
                title: JSON.stringify(title),
                version: JSON.stringify(version)
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './public',
                    to: './'
                },
                {
                    from: './gen',
                    to: './res',
                    globOptions: {
                        ignore: ["**/*.ts"],
                    },
                },
                {
                    from: './res/',
                    to: './res',
                    globOptions: {
                        ignore: ["**/*.ts"],
                    },
                    filter: (filePath) => {
                        const resDir: string = path.resolve('./res')

                        function accept(jsonFile: string): boolean {
                            if (fs.existsSync(jsonFile)) {
                                const texturePack: any = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))
                                for (let frame of Object.keys(texturePack["frames"])) {
                                    const framePath: string = path.join(resDir, frame)
                                    if (framePath == path.normalize(filePath)) {
                                        return false
                                    }
                                }
                            }
                            return true
                        }

                        function acceptRecursively(filePath: string): boolean {
                            const jsonFile: string = `${path.dirname(filePath)}.json`
                            if (path.normalize(filePath) == path.dirname(resDir)) {
                                return true
                            }
                            if (!accept(jsonFile)) {
                                return false
                            }
                            return acceptRecursively(path.dirname(filePath))
                        }

                        return acceptRecursively(filePath.replace("/res/", "/gen/"))
                    }
                }
            ],
        })
    ]
}
