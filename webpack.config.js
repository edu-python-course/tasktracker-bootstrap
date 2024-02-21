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

const templateParameters = {
    favicon_png: "../assets/img/favicon.png",
    favicon_svg: "../assets/img/favicon.svg",
}

// webpack config object
// noinspection WebpackConfigHighlighting,HttpUrlsUsage
module.exports = {
    mode: "development",
    output: {
        filename: "assets/js/main.bundle.js",
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
        new MiniCSSExtractPlugin({filename: "assets/css/main.min.css"}),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/list_view.hbs"),
            filename: "templates/task_list.html",
            templateParameters: {
                ...templateParameters,
                title: "Tasks List",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/detail_view.hbs"),
            filename: "templates/task_detail.html",
            templateParameters: {
                ...templateParameters,
                title: "Tasks Details",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/form_view.hbs"),
            filename: "templates/task_form.html",
            templateParameters: {
                ...templateParameters,
                title: "Task Form",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/profile_view.hbs"),
            filename: "templates/profile.html",
            templateParameters: {
                ...templateParameters,
                title: "User Profile",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/signup_view.hbs"),
            filename: "templates/signup.html",
            templateParameters: {
                ...templateParameters,
                title: "Sign Up",
            }
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/views/signin_view.hbs"),
            filename: "templates/signin.html",
            templateParameters: {
                ...templateParameters,
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
                    filename: "assets/img/[name][ext]"
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name][ext][query]"
                }
            },
            {
                mimetype: "image/svg+xml",
                scheme: "data",
                type: "asset/resource",
                generator: {
                    filename: "assets/icons/[hash].svg"
                }
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    }
}
