const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const package_json = require("./package.json");

module.exports = (env, options) => {

    const is_production = options.mode === "production";

    return {
        entry: {
            "index": "./src/index.tsx",
        },
        output: {
            filename: is_production ? "[chunkhash].js" : "[name].js",
            path: path.join(__dirname, "dist")
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ["ts-loader"]
                },
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: package_json.description,
                chunks: ["index"],
                template: "src/index.ejs"
            }),
        ]
    };
}