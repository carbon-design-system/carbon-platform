module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
    'scope-enum': [
      2,
      'always',
      [
        '',
        'api',
        'database',
        'object-storage',
        'icons',
        'logging',
        'messaging',
        'micromanage',
        'release',
        'schemas',
        'search',
        'web-app'
      ]
    ],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'wip'
      ]
    ]
  }
}
