module.exports = {
    presets: [
        ['module:metro-react-native-babel-preset', { runtime: 'automatic' }]
    ],
    plugins: [
        ['module:react-native-dotenv', {
            "moduleName": "@env",
            "path": ".env",
            "safe": true,
            "allowUndefined": false
        }],
        ['@babel/plugin-transform-class-properties', { "loose": true }],
        ['@babel/plugin-transform-private-methods', { "loose": true }],
        ['@babel/plugin-transform-private-property-in-object', { "loose": true }]
    ]
};