# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.15](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.14...@carbon-platform/api@0.2.15) (2022-03-05)

### [0.2.14](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.13...@carbon-platform/api@0.2.14) (2022-02-25)


### Features

* **logging:** make message queues environment-aware ([f3fa760](https://github.com/carbon-design-system/carbon-platform/commit/f3fa760a1b756441a240cc63c984fc4a2348e681))

### [0.2.13](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.12...@carbon-platform/api@0.2.13) (2022-02-22)

### [0.2.12](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.11...@carbon-platform/api@0.2.12) (2022-02-22)


### Features

* **api:** add additonal readiness endpoint ([25fa805](https://github.com/carbon-design-system/carbon-platform/commit/25fa8058f40f47d54597080138d70accffa9fa04))
* **api:** add certs and auth to messaging ([532f1f6](https://github.com/carbon-design-system/carbon-platform/commit/532f1f6c54bf96088b093bcb6d27720fec9bdd44))
* common microservice infrastructure ([37e77dc](https://github.com/carbon-design-system/carbon-platform/commit/37e77dcf7b4551d54c426339115d3d9b4a2a2f8b)), closes [#97](https://github.com/carbon-design-system/carbon-platform/issues/97)

### [0.2.11](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.10...@carbon-platform/api@0.2.11) (2022-02-19)

### [0.2.10](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.9...@carbon-platform/api@0.2.10) (2022-02-18)

### [0.2.9](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.8...@carbon-platform/api@0.2.9) (2022-02-16)

### [0.2.8](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.7...@carbon-platform/api@0.2.8) (2022-02-09)

### [0.2.7](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.6...@carbon-platform/api@0.2.7) (2022-02-04)

### [0.2.6](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.5...@carbon-platform/api@0.2.6) (2022-02-03)


### Features

* **api:** switch dev auth from sequelize to session file store ([d1c2042](https://github.com/carbon-design-system/carbon-platform/commit/d1c2042558e23cd86a08cd141e8d38fac583c622))
* **logging:** distinguish between validated and unvalidated messages ([93379d5](https://github.com/carbon-design-system/carbon-platform/commit/93379d5de72027c5b12a42619f8cbb0ccde19c8c))

### [0.2.5](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.4...@carbon-platform/api@0.2.5) (2022-02-01)


### Features

* **api:** implement logging api ([117ac52](https://github.com/carbon-design-system/carbon-platform/commit/117ac52a456e0b67bbd4aeaa7f95b8eff8c4abaf))


### Bug Fixes

* **logging:** add missing optional indicator ([705ac7c](https://github.com/carbon-design-system/carbon-platform/commit/705ac7ca6c1f44b1cab45c01c742604f7f508e7f))

### [0.2.4](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.3...@carbon-platform/api@0.2.4) (2022-01-31)

### [0.2.3](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.2...@carbon-platform/api@0.2.3) (2022-01-29)


### Bug Fixes

* **api:** minor auth updates ([58df0ee](https://github.com/carbon-design-system/carbon-platform/commit/58df0ee272ffe433bba1fb297004208364ee2ba6))

### [0.2.2](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.1...@carbon-platform/api@0.2.2) (2022-01-28)

### [0.2.1](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.0...@carbon-platform/api@0.2.1) (2022-01-28)

## [0.2.0](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.1.3...@carbon-platform/api@0.2.0) (2022-01-27)


### ⚠ BREAKING CHANGES

* **messaging:** - run-mode API has changed.
- TEST is no longer a mode
- PRODUCTION is now called PROD

### Features

* **api:** introduce enforce env vars package with getEnvVar function ([bdf122d](https://github.com/carbon-design-system/carbon-platform/commit/bdf122dfa19c5a7151f81429b38b97f7602648c6))
* **messaging:** implement messaging api ([e4188dc](https://github.com/carbon-design-system/carbon-platform/commit/e4188dcf007eae4bdbbb2bcc455e60ff8b7051d4))


### Bug Fixes

* **api:** refactor enforce-env-vars, add test case ([47d2824](https://github.com/carbon-design-system/carbon-platform/commit/47d28241a046ef701849da1c8f4d5e99f883b315))
* **messaging:** address review comments ([9cb6d57](https://github.com/carbon-design-system/carbon-platform/commit/9cb6d57db672fea548a5db05d5105add48dcecc7))
* **messaging:** connect race condition ([f232fcf](https://github.com/carbon-design-system/carbon-platform/commit/f232fcf95f5211626f8fc3bc9e6d8f13cd798a94))

### [0.1.3](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.1.2...@carbon-platform/api@0.1.3) (2022-01-04)
