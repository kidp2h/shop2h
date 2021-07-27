const path = require("path");
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: {user:"./src/public/js/user.ts",shop:"./src/public/js/shop.ts"},
    output: { path: path.join(__dirname, "../../../dist/public/js"), filename: "[name].js" },
    mode: 'development',
        resolve: {
        extensions: [".ts",".js"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new Dotenv()
    ]
}
