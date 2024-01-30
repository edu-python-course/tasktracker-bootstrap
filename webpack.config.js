/**
 * Webpack configuration
 *
 * This configuration uses the default entry point for webpack v5 at
 * "src/index.js" (omitted inside the config object)
 *
 */

"use strict"

const path = require("path")
const autoprefixer = require("autoprefixer")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const api = require("./api/settings")

// webpack config object
// noinspection WebpackConfigHighlighting,HttpUrlsUsage
module.exports = {
    mode: "development",
    output: {
        filename: "js/main.bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    devServer: {
        static: path.resolve(__dirname, "dist"),
        port: 3000,
        hot: true,
        proxy: {
            "/api/*": {
                target: `http://${api.host}:${api.port}`,
                secure: false,
            }
        }
    },
    plugins: [
        new MiniCSSExtractPlugin({filename: "css/main.min.css"}),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/list_view.hbs"),
            filename: "tasks/task_list.html",
            templateParameters: {
                title: "Tasks List",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/detail_view.hbs"),
            filename: "tasks/task_detail.html",
            templateParameters: {
                title: "Tasks Details",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/form_view.hbs"),
            filename: "tasks/task_form.html",
            templateParameters: {
                title: "Task Form",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/profile_view.hbs"),
            filename: "users/profile.html",
            templateParameters: {
                title: "User Profile",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/signup_view.hbs"),
            filename: "auth/signup.html",
            templateParameters: {
                title: "Sign Up",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/signin_view.hbs"),
            filename: "auth/signin.html",
            templateParameters: {
                title: "Sign In",
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: MiniCSSExtractPlugin.loader},
                    {loader: "css-loader"},
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer]
                            }
                        }
                    },
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "img/[name][ext]"
                }
            },
            {
                mimetype: "image/svg+xml",
                scheme: "data",
                type: "asset/resource",
                generator: {
                    filename: "icons/[hash].svg"
                }
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    }
}
