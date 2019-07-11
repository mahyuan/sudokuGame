
module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'commonJS'
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    extends: ['plugin:recommended'],
}