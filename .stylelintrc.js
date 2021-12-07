module.exports = {
  extends: ['stylelint-config-carbon'],
  allowEmptyInput: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: {
    'selector-pseudo-class-no-unknown': null,
    'max-nesting-depth': [
      1,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['include']
      }
    ]
  }
}
