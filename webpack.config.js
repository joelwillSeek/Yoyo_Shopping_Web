const path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    mode:"development",
    entry:{
        bundler:path.resolve(__dirname,"src/main.js"),
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name][contenthash].js",
        clean:true,
        assetModuleFilename:"[name][ext]",
    },
    devtool:"source-map",
    devServer:{
        static:{
            directory:path.resolve(__dirname,"dist")
        },
        port:3002,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            chunks:["bundler"],
            title:"Yoyo Shopping"
        }
            
        )
    ]
    ,
    module:{
        rules:[
            {
                test:/.css$/i,
                use:["style-loader","css-loader"],
            },
            {
                test:/.(png|jpg|jpeg|svg)$/i,
                type:"asset/resource"
            },
            {
                test:/.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-env","@babel/preset-react"]
                    }
                }
            }
        ]
    },

    resolve:{
        extensions:[".js",".jsx"]
    }
}