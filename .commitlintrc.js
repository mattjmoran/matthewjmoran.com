module.exports = {
  extends: ['gitmoji'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w*:)(?:\s*)(.*)$/,
      headerCorrespondence: ['', 'subject'],
    },
  },
  rules: {
    'type-empty': [0, 'never'],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
    'subject-case': [2, 'always', 'sentence-case'],
    'body-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
}
