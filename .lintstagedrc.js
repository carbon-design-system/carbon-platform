module.exports = {
  '**/*.(js|jsx|ts|tsx)': ['prettier --write', 'eslint --fix', 'scripts/micromanage link'],
  '**/*.scss': ['prettier --write', 'stylelint --fix', 'scripts/micromanage link'],
  '!(*sass).md': ['prettier --write']
}
