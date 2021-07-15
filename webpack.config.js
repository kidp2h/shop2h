const path = require("path");
const nodeExternals = require("webpack-node-externals")
module.exports = {
    entry: {server:"./src/server.ts"},
    output: { path: path.join(__dirname, "./dist"), filename: "[name].js" },
    mode:"development",
    target:"node",
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                use: ["ts-loader"],
            }  
        ]
    },
    resolve : {
        extensions : [".ts",".js"]
    },
    externals : [nodeExternals()]
}