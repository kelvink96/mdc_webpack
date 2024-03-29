const autoprefixer = require('autoprefixer');

// autoprefixer and postcss dependencies are for vendor specific styles
module.exports = [{
    entry: ['./app.sass', './app.js'],
    output: {
        // This is necessary for webpack to compile
        // But we never use style-bundle.js
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    // configs for vendor specific styles
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        // include mdc components
                        options: {
                            sassOptions: {
                                includePaths: ['./node_modules']
                            }
                        }
                    },
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
        ]
    },
}];