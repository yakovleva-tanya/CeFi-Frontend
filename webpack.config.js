const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: `${process.env.NODE_ENV}`,

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.CRA_URLS_ARROWHEAD": `'${process.env.CRA_URLS_ARROWHEAD}'`,
      "process.env.NODE_ENV": `'${process.env.NODE_ENV}'`,
      "process.env.NOTIFY_ID": `'${process.env.NOTIFY_ID}'`,
      "process.env.BLOCKNATIVE_API_KEY": `'${process.env.BLOCKNATIVE_API_KEY}'`,
      "process.env.BLOCKNATIVE_NETWORK": `${process.env.BLOCKNATIVE_NETWORK}`,
      "process.env.FORTMATIC_API_KEY": `'${process.env.FORTMATIC_API_KEY}'`,
      "process.env.FORTMATIC_NETWORK": `'${process.env.FORTMATIC_NETWORK}'`,
      "process.env.INTEGRATIONS_DISABLED": `'${process.env.INTEGRATIONS_DISABLED}'`,
      "process.env.PLAID_ENV": `'${process.env.PLAID_ENV}'`,
      "process.env.PLAID_KEY": `'${process.env.PLAID_KEY}'`,
      "process.env.SERVER_URL": `'${process.env.SERVER_URL}'`,
      "process.env.DATA_PROVIDERS_URLS_BANK_INFO": `'${process.env.DATA_PROVIDERS_URLS_BANK_INFO}'`,
      "process.env.INFURA_API_KEY": `'${process.env.INFURA_API_KEY}'`,
      "process.env.RPC_URL": `'${process.env.RPC_URL}'`,
    }),
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "plaid-files": "Plaid",
    fortmatic: "Fortmatic",
    wyre: "Wyre",
  },
};
