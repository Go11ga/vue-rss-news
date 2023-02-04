module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    collectCoverageFrom: [
        "**/src/**/*.{js,vue}", 
        "!**/node_modules/**", 
        "!**src/main.js**", 
        "!**src/router.js**"
    ]
}
