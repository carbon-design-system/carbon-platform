# Dev environment setup

The Carbon Platform project recommends using VS Code as your IDE, however any editor will work. The
following are recommended for a VS Code-based setup.

## Extensions

The most important extension to get is a good color theme. Feeling cool while you develop increases
productivity. Here's some that the Carbon Platform team uses:

- **Sapphire Theme** (tyriar.theme-sapphire)
- **Night Owl** (sdras.night-owl)
- **Moonlight II** (atomiks.moonlight)

The Carbon Design System also has a set of product icons you can use in VS Code.

- **Carbon Product Icons** (antfu.icons-carbon)

The rest of these extensions will make life way easier, since they'll help with linting, formatting,
and code smells. They help out with SonarCloud's "clean as you code" philosophy.

- **ESLint** (dbaeumer.vscode-eslint)
  - Shows linting errors as you type. Allows auto-fixing on save.
- **MDX** (silvenon.mdx)
  - Provides syntax highlighting and bracket matching for MDX files.
- **Prettier** - Code formatter (esbenp.prettier-vscode)
  - Enables auto-formatting on save to match Prettier code styles.
- **SonarLint** (sonarsource.sonarlint-vscode)
  - Provides real-time static code analysis to find bugs and issues as you code.
- **Stylelint** (stylelint.vscode-stylelint)
  - Provides style linting, fixing, formatting as you type.
- **Live Share** (ms-vsliveshare.vsliveshare)
  - Allows devs to start on-demand live coding sessions with each other.

## Settings config setup

There are a few settings you should set to make best possible use of the extensions listed above.
It's up to you on if you'd prefer to see these globally or only for the Carbon Platform workspace.

```jsonc
{
  // Turns on "fix on save" for eslint
  "editor.codeActionsOnSave": ["source.fixAll.eslint"],
  // Sets prettier as the default formatter (for all file types, but this can be configured to your liking)
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // Allow prettier to apply formatting on file saves
  "editor.formatOnSave": true,

  // IBM recommends this setting to prevent unwanted guests in liveshare sessions
  "liveshare.guestApprovalRequired": true,

  // Only apply prettier formatting if there's a config file present
  "prettier.requireConfig": true,

  // This one is important! Add "scss" to the list of style files that will be linted
  "stylelint.validate": ["css", "less", "postcss", "scss"]
}
```
