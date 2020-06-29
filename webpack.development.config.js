const path = require('path');
const webpack = require('webpack');
const env = require('./.development-secrets.json');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: false,
        port: 3000,
        hot: true,
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    module: {
        rules: [

            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    },
                ]
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
               'file-loader',
              ],
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },
        ]
    },

    plugins: [
      new webpack.DefinePlugin(env),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "plaid-files": "Plaid",
        "fortmatic": "Fortmatic"
    }
};
