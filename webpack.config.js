var webpack = require('webpack'),
    path = require('path'),
    projectName = require("./package.json").name,
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'eagle-styles': './less/eagle-styles.less',
        'meituan': './less/meituan.less',
        'skin': './less/skin.less'
    },
    output: {
        path: path.join(process.cwd(),'dist'),
        filename: '[name].css'
    },
    module: {
        loaders:[{
            test:/\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader", {publicPath: './iconfont/'})
        },{
            test:/\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=[name].[ext]&outputPath=./iconfont/'
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}