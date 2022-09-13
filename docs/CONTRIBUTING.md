# Contributing

## Day-to-day development tasks

For detailed information about working with the repository from a day-to-day development standpoint,
check out the [Day to day development](./day-to-day-development.md) docs.

## Commit conventions

This project follows a structured format for writing commit messages. The main benefit of this
approach is that we can use these details to automatically generate things like changelogs, in
addition to clarifying what changes correspond to when looking at our Git history.

Commit message titles will show up in the changelog of each package, so each message should be as
descriptive as possible.

Commit message bodies should include all closed and relevant issue numbers. These will show up in
the changelog as well.

Feature related write-ups should be outlined in detail within the PR description.

### Commit message format

_Parts of this section are duplicated from
[Angular's commit conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)._

Each commit message consists of a **header**, a **body** and a **footer**. The header has a specific
format that includes a type, a scope and a subject:

```git
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional. There are a few validation
rules that we also enforce, namely that:

- The header must always be fewer than **72** characters
- Any line in the commit body must be fewer than **100** characters
- Header and scope must each be a value from
  [.commitlintrc.js](https://github.com/carbon-design-system/carbon-platform/blob/main/.commitlintrc.js)

Most of these rules are to help with integration of `git` with common tools.

_Note: we check for this commit format using a tool called
[`commitlint`](https://commitlint.js.org/#/)_.

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The
body should include the motivation for the change and contrast this with previous behavior.

### Footer/breaking changes

The footer should contain any information about Breaking Changes.

Breaking Changes should start with the word `BREAKING CHANGE:` with a space or two newlines. The
rest of the commit message is then used for this.

### Examples:

`feat(logging): debug logging interface`

### Type

See the `type-enum` section of
[.commitlintrc.js](https://github.com/carbon-design-system/carbon-platform/blob/main/.commitlintrc.js).

### Scope

See the `scope-enum` section of
[.commitlintrc.js](https://github.com/carbon-design-system/carbon-platform/blob/main/.commitlintrc.js).

## Branch name conventions

Branch names in the carbon-platform should take one of the two following forms:

### Branches relating to one or more issues

Pick the issue number that makes the most sense, put that at the front of the branch name, and use
kebab case after that to give a description of it. For a feature branch in support of an epic, use
the epic's issue number.

**Examples:**

Specific issue: `1234-fix-that-broken-thing`

Relates to multiple issues (e.g. a feature branch): `994-mdx-sanitizer`

### Branches with no associated issues

Start the branch name with your name or GitHub userid and a slash (doesn't matter which as long as
you're consistent). Then add a descriptive name for your branch after the slash. This branch name
format is typically used for PoCs, research branches, etc.

**Examples:**

A PoC: `francine/remote-mdx-poc`

An A-B research branch: `alison/nav-structure-options`
