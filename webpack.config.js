var path= require("path");
module.exports={
    entry: './src/App.js',
    output:{
     path:path.resolve(__dirname,'bundle'),
     filename:'bundle.js'
    },
    module: {
            test:/\.js$/,
            exclude:/node_modules/,
            loaders:["babel-loader"]
    },
    mode:'development'
};