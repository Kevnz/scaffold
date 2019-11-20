module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  testRegex: './*\\.spec\\.js$',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}
