const fs = require("fs");
const path = require('path');

const DefinePlugin = require("webpack").DefinePlugin;

const package_json = JSON.parse(fs.readFileSync("./package.json"));





module.exports = (env)=>{
    const VERSION = package_json.version;


    const is_dev = (env.production === undefined);

    const output_path = path.join(__dirname, "dist");

    const common_srcpath = path.join(__dirname, "src", "common");

    const generic_rules = [
        {
            test: /\.(js)$/,
            loader: 'ifdef-loader',
            exclude: /node_modules/,
            options: {
                DEV: is_dev,
            }
        }

    ];

    const generic_plugins = [
        new DefinePlugin({
            APPNAME: JSON.stringify(package_json.name),
            VERSION: JSON.stringify(VERSION),
            DEV: JSON.stringify(is_dev),
        })
    ];


    let ret = [];

    ret.push({
        entry: path.resolve(__dirname, "src", 'index.js'),
        mode: is_dev?'development':'production',
        watch: true,
        target: "node",
        output: {
            filename: `node-brotherqlprinter.${is_dev?'dev':'dist'}.js`,
            path: output_path,
            library: "BrotherQLPrinter",
            libraryTarget: "umd",
        },
        resolve: {
            alias: {
                app: path.resolve(__dirname, "src"),
                common: common_srcpath,
            },
        },
        externals: {
            "jimp": "jimp",
        },
        module: {
            rules: generic_rules, 
        },
        plugins: generic_plugins,
    });


    return ret;
};