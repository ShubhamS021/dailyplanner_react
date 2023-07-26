const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const path = require('path');

module.exports = (_env, argv) => {
    const isDevelopment = argv.mode === 'development';
    console.log(`Building in ${argv.mode} mode.`);

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            index: ['./src/index.tsx'],
        },
        devServer: {
            hot: true,
            static: [{ directory: path.join(__dirname, 'public') }],
            host: '0.0.0.0',
        },
        devtool: isDevelopment ? 'source-map' : false,
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: './index.html',
                favicon: './public/favicon.ico',
            }),
            ...(isDevelopment
                ? [new ReactRefreshWebpackPlugin({ overlay: false })]
                : []),
        ],
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                getCustomTransformers: () => ({
                                    before: [
                                        isDevelopment &&
                                            ReactRefreshTypeScript(),
                                    ].filter(Boolean),
                                }),
                                transpileOnly: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(js|jsx)?$/,
                    include: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.svg/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    exclude: /node_modules/,
                    use: ['file-loader?name=[name].[ext]'],
                },
            ],
        },
    };
};
