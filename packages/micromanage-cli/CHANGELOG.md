# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.1](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@4.0.0...micromanage-cli@4.0.1) (2022-12-02)

## [4.0.0](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@3.1.2...micromanage-cli@4.0.0) (2022-11-05)


### ⚠ BREAKING CHANGES

* **micromanage:** - "--base" option in "changed" command has been replaced with "--since"
- deprecated "deploy" command has been removed

### Features 🌟

* **micromanage:** allow base workspace to be passed to changed command ([daca9b3](https://github.com/carbon-design-system/carbon-platform/commit/daca9b31fd9a8c995c830d1230d4b8a913a4d498))


### Bug Fixes 🐛

* **micromanage:** more comprehensive changed workspace output ([5e8bbb9](https://github.com/carbon-design-system/carbon-platform/commit/5e8bbb9aa4c183f303a3ccfd7be256c87232ee6d))

### [3.1.2](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@3.1.1...micromanage-cli@3.1.2) (2022-10-13)


### Misc. 🔮

* update package.json repo and bugs links ([3c089cd](https://github.com/carbon-design-system/carbon-platform/commit/3c089cdde1ddde2a3b9f750680755c4253bfcae2))

### [3.1.1](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@3.1.0...micromanage-cli@3.1.1) (2022-10-06)


### Misc. 🔮

* update node module minor/patch versions ([64b0ce7](https://github.com/carbon-design-system/carbon-platform/commit/64b0ce7d86a07ace4aca00f400649680b99a6da1))

## [3.1.0](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@3.0.0...micromanage-cli@3.1.0) (2022-09-20)


### Bug Fixes 🐛

* **micromanage:** add pull arg to docker build command ([a05648e](https://github.com/carbon-design-system/carbon-platform/commit/a05648e0417652d2d6030e09643ebf472ac7a4c4))


### Features 🌟

* **micromanage:** add pull option to build command ([3caab44](https://github.com/carbon-design-system/carbon-platform/commit/3caab44223a1f481171a2662633ab534271daf13))

## [3.0.0](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@2.1.1...micromanage-cli@3.0.0) (2022-09-14)


### ⚠ BREAKING CHANGES

* **micromanage:** The default output format of the build command has changed.

### Features 🌟

* **micromanage:** output latest tag in build command ([25c2373](https://github.com/carbon-design-system/carbon-platform/commit/25c2373645a55dc722c376329e116ebbbce358c7))


### Bug Fixes 🐛

* **micromanage:** update command docs ([dd9187b](https://github.com/carbon-design-system/carbon-platform/commit/dd9187bfac440ee020e5f1ad65fbaae6051ae6c6))

### [2.1.1](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@2.1.0...micromanage-cli@2.1.1) (2022-09-13)


### Bug Fixes 🐛

* **micromanage:** allow zero workspaces to be passed to version command ([735f2c7](https://github.com/carbon-design-system/carbon-platform/commit/735f2c7d42dcc8e4d75c8b2da46ccdaf7d72e1bb))

## [2.1.0](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@2.0.4...micromanage-cli@2.1.0) (2022-09-11)


### Features 🌟

* **micromanage:** add install and uninstall commands ([1a84b9c](https://github.com/carbon-design-system/carbon-platform/commit/1a84b9ce39901bdc88f2b0e78062e374312c7ce3))


### Bug Fixes 🐛

* **micromanage:** remove install command regex in favor of index check ([69a6014](https://github.com/carbon-design-system/carbon-platform/commit/69a6014cd1d7ab998a73a06a8c97d4c4069c89ef))
* **micromanage:** slight version command commit message adjustment ([b71789c](https://github.com/carbon-design-system/carbon-platform/commit/b71789ca8653e2bc1cbfb07fc486f03f8d8a917b))

### [2.0.4](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@2.0.3...micromanage-cli@2.0.4) (2022-09-08)


### Bug Fixes 🐛

* **micromanage:** change add to push in changed command ([f150b4b](https://github.com/carbon-design-system/carbon-platform/commit/f150b4bcae57b785a95f39007a676da519251235))

### [2.0.3](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@2.0.2...micromanage-cli@2.0.3) (2022-09-08)


### Misc. 🔮

* **micromanage:** remove octokit since it is no longer used ([c84582e](https://github.com/carbon-design-system/carbon-platform/commit/c84582e08b2b988b492247486307f58bea48b753))

### [2.0.2](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@2.0.1...micromanage-cli@2.0.2) (2022-09-08)


### Misc. 🔮

* move standard-version dep from base to micromanage ([9da47c4](https://github.com/carbon-design-system/carbon-platform/commit/9da47c448671ca9d5f9f793f068349ea88661011))


### Bug Fixes 🐛

* **micromanage:** change spawned command output stream ([c62b1e1](https://github.com/carbon-design-system/carbon-platform/commit/c62b1e122e151866bb2af779652b7ba575c84a6f))

### [2.0.1](https://github.com/carbon-design-system/carbon-platform/compare/micromanage-cli@2.0.0...micromanage-cli@2.0.1) (2022-09-08)


### Bug Fixes 🐛

* **micromanage:** improve debug logging in build command ([1074a92](https://github.com/carbon-design-system/carbon-platform/commit/1074a923cb30049d3ad388fe4e5c6ad74c06d273))

## 2.0.0 (2022-09-08)


### ⚠ BREAKING CHANGES

* **micromanage:** This is a complete rewrite of the command interfaces.

### Features 🌟

* **micromanage:** huge improvements and rework ([67285a6](https://github.com/carbon-design-system/carbon-platform/commit/67285a690cc7fb71a1bd7105b1b59e544d713704))


### Bug Fixes 🐛

* **micromanage:** sonar lint issue with process.exit ([48f017f](https://github.com/carbon-design-system/carbon-platform/commit/48f017f0cd29e3d77f809b739929a8b689487414))
* resolve merge conflicts ([04aaa6b](https://github.com/carbon-design-system/carbon-platform/commit/04aaa6b4d27cbd4ed11e6c66845ab84f3eb39b5d))

### [1.4.5](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.4.4...@carbon-platform/micromanage-cli@1.4.5) (2022-08-24)

### [1.4.4](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.4.3...@carbon-platform/micromanage-cli@1.4.4) (2022-08-24)


### Misc. 🔮

* update node modules and related documentation ([7a7a955](https://github.com/carbon-design-system/carbon-platform/commit/7a7a955ed7b12220ac79cf321c5f5e2543529e17))

### [1.4.3](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.4.2...@carbon-platform/micromanage-cli@1.4.3) (2022-08-20)


### Misc. 🔮

* rebuild lockfile and update deps minor/patch ([7bfa4e4](https://github.com/carbon-design-system/carbon-platform/commit/7bfa4e459317175233af2eaaf1b188c0a42fe8d0))

### [1.4.2](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.4.1...@carbon-platform/micromanage-cli@1.4.2) (2022-07-28)

### [1.4.1](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.4.0...@carbon-platform/micromanage-cli@1.4.1) (2022-07-27)


### Bug Fixes 🐛

* **micromanage:** add better debug logging ([a191325](https://github.com/carbon-design-system/carbon-platform/commit/a1913259ad8b5a4f80c93716fe8bffb4aba29004))
* **micromanage:** adjust git log command to properly return commits ([c3e060d](https://github.com/carbon-design-system/carbon-platform/commit/c3e060d6d67c1d1e84fba183d23a8c079ae76f3a))

## [1.4.0](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.3.0...@carbon-platform/micromanage-cli@1.4.0) (2022-07-23)


### Features 🌟

* **micromanage:** add script for commenting version changes on PRs ([3ba20f6](https://github.com/carbon-design-system/carbon-platform/commit/3ba20f6b7aa0a4cc27813d56cfa80a6ed8a7dbee))


### Misc. 🔮

* update node module minor versions ([767b5f7](https://github.com/carbon-design-system/carbon-platform/commit/767b5f7cf5db0a0423dfa04193e64d029a022006))


### Bug Fixes 🐛

* **micromanage:** adjust wording to clarify what causes re-versioning ([88f1d3a](https://github.com/carbon-design-system/carbon-platform/commit/88f1d3a2b818d8c292063748af86181a3c458012))

## [1.3.0](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.14...@carbon-platform/micromanage-cli@1.3.0) (2022-07-20)


### Features 🌟

* **micromanage:** allow version comparison against any ref ([ab2886d](https://github.com/carbon-design-system/carbon-platform/commit/ab2886d996258aeed012b2da93f096fd14731219))

### [1.2.14](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.13...@carbon-platform/micromanage-cli@1.2.14) (2022-06-15)


### Misc. 🔮

* update node modules ([91ff95f](https://github.com/carbon-design-system/carbon-platform/commit/91ff95fd3d9c797f291099f3d875959010f822f0))

### [1.2.13](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.12...@carbon-platform/micromanage-cli@1.2.13) (2022-06-11)


### Bug Fixes 🐛

* **micromanage:** version push failure when upstream has newer commits ([4a14473](https://github.com/carbon-design-system/carbon-platform/commit/4a14473aafd50ed4297881462981dd105229c5b6))

### [1.2.12](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.11...@carbon-platform/micromanage-cli@1.2.12) (2022-06-10)


### Bug Fixes 🐛

* **web-app:** app hangs when disconencting from message broker ([bfe11fa](https://github.com/carbon-design-system/carbon-platform/commit/bfe11fa053859ce41c411e68071df433901f4499))

### [1.2.11](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.10...@carbon-platform/micromanage-cli@1.2.11) (2022-04-30)


### Misc. 🔮

* update node modules ([7b05aa4](https://github.com/carbon-design-system/carbon-platform/commit/7b05aa4fd0ec90d343e3fbe5a9a5d8ee8e238f27))

### [1.2.10](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.9...@carbon-platform/micromanage-cli@1.2.10) (2022-03-30)

### [1.2.9](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.8...@carbon-platform/micromanage-cli@1.2.9) (2022-03-29)


### Bug Fixes 🐛

* **micromanage:** stop using chore in favor of release ([7d0d1e3](https://github.com/carbon-design-system/carbon-platform/commit/7d0d1e387bc42ba9c66c2fa22f3643e0a1262b94))

### [1.2.8](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.7...@carbon-platform/micromanage-cli@1.2.8) (2022-03-22)


### Bug Fixes 🐛

* **web-app:** update @carbon/react and other packages ([eac0c0d](https://github.com/carbon-design-system/carbon-platform/commit/eac0c0d397209bee13b8818055e2f9a075922253))

### [1.2.7](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.6...@carbon-platform/micromanage-cli@1.2.7) (2022-03-10)

### [1.2.6](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.5...@carbon-platform/micromanage-cli@1.2.6) (2022-03-09)

### [1.2.5](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.4...@carbon-platform/micromanage-cli@1.2.5) (2022-03-01)


### Bug Fixes

* add schema readme ([5381484](https://github.com/carbon-design-system/carbon-platform/commit/53814840e33955ec6eb5cff3d3d1f72eac23b01f))

### [1.2.4](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.3...@carbon-platform/micromanage-cli@1.2.4) (2022-03-01)

### [1.2.3](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.2...@carbon-platform/micromanage-cli@1.2.3) (2022-03-01)

### [1.2.2](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.1...@carbon-platform/micromanage-cli@1.2.2) (2022-03-01)

### [1.2.1](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/micromanage-cli@1.2.0...@carbon-platform/micromanage-cli@1.2.1) (2022-03-01)

## 1.2.0 (2022-02-22)


### Features

* **micromanage:** refactor micromanage to its own package ([6013009](https://github.com/carbon-design-system/carbon-platform/commit/6013009b041a8ea296d788f772da53f6c8d32655))
