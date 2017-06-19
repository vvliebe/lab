module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  env: {
    browser: true,
  },
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  },
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
}
