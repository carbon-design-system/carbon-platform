---
title: Contributing
---

# Contributing!

TODO: add more details

## Commit conventions

This project follows a structured format for writing commit messages. The main
benefit of this approach is that we can use these details to automatically
generate things like changelogs, in addition to clarifying what changes
correspond to when looking at our Git history.

### Commit message format

_Parts of this section are duplicated from
[Angular's commit conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)_.

Each commit message consists of a **header**, a **body** and a **footer**. The
header has a specific format that includes a type, a scope and a subject:

```git
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional. There
are a few validation rules that we also enforce, namely that:

- The header must always be fewer than **72** characters
- Any line in the commit body must be fewer than **80** characters

Most of these rules are to help with integration of `git` with common tools.

_Note: we check for this commit format using a tool called
[`commitlint`](https://commitlint.js.org/#/)_.

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the subject, use the imperative, present tense: "change" not
"changed" nor "changes". The body should include the motivation for the change
and contrast this with previous behavior.

### Footer

The footer should contain any information about Breaking Changes.

Breaking Changes should start with the word `BREAKING CHANGE:` with a space or two
newlines. The rest of the commit message is then used for this.

### Examples:

`feat(logging-service): debug logging interface`

### Type

Here are the valid types that can be used in a commit message header:

- `build` - Changes that affect the build system or external dependencies (e.g. npm, tsconfig, etc.)
- `ci` - Changes to CI configuration files and scripts (e.g. GH Workflows, SonarCloud, etc.)
- `dev` - Changes that affect the developer workflow/experience (e.g. Git hooks, git ignores, linters, formatters, etc.)
- `docs` - Documentation changes
- `feat` - A new feature (corresponds to a minor version)
- `fix` - A fix for an issue (corresponds to a patch version)
- `style` - Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `test` - Changes/additions to tests
