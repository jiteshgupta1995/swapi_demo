var path = require('path');

var config = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
            },
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            exclude: /node_modules/,
            loaders: [
                'file-loader',
            ],
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            use: [{
                loader: 'style-loader',
            },{
                loader: 'css-loader',
                options: {
                    modules: true,
                },
            }],
        },{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader", // creates style nodes from JS strings
            }, {
                loader: "css-loader", // translates CSS into CommonJS
                options: {
                    sourceMap: true,
                },
            }, {
                loader: "sass-loader", // compiles Sass to CSS
                options: {
                    sourceMap: true,
                },
            }],
        }],
    },
};

module.exports = config;