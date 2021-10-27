module.exports = {
  '**/*.(js|jsx|ts|tsx)': ['prettier --write', 'eslint --fix'],
  '**/*.scss': ['prettier --write', 'stylelint --fix'],
  '!(*sass).md': ['prettier --write']
}
