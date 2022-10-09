# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.4](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.4.3...@carbon-platform/api@0.4.4) (2022-10-06)


### Misc. 🔮

* add tsconfig.tsbuildinfo to clean scripts for all ts workspaces ([edcdaaa](https://github.com/carbon-design-system/carbon-platform/commit/edcdaaa1a1175a34f16d97e497f8d51bfe827673))
* update node module minor/patch versions ([64b0ce7](https://github.com/carbon-design-system/carbon-platform/commit/64b0ce7d86a07ace4aca00f400649680b99a6da1))

### [0.4.3](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.4.2...@carbon-platform/api@0.4.3) (2022-09-30)


### Misc. 🔮

* **data-graph:** remove extraneous interface syntax ([4d0b771](https://github.com/carbon-design-system/carbon-platform/commit/4d0b7713969858ded227f96e440090d99d9f9606))
* rename controller handler methods ([1808b75](https://github.com/carbon-design-system/carbon-platform/commit/1808b75327b506904ee0ac470373cdfe4282f31a))

### [0.4.2](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.4.1...@carbon-platform/api@0.4.2) (2022-09-14)


### Bug Fixes 🐛

* **logging:** avoid console logs in standard run mode ([8cfa614](https://github.com/carbon-design-system/carbon-platform/commit/8cfa61461fa2c7eab0869eff1488ee07db28a1c3))

### [0.4.1](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.4.0...@carbon-platform/api@0.4.1) (2022-09-10)


### Bug Fixes 🐛

* **logging:** truncate long return values in withTrace ([6ea9032](https://github.com/carbon-design-system/carbon-platform/commit/6ea90329fb73c50451ff7a9a3d4f4d2362fd6627))


### Misc. 🔮

* improve ts linting and type checking ([4a5a937](https://github.com/carbon-design-system/carbon-platform/commit/4a5a9370ef4985cd2393e9337c0fbe92ee982c9c))

## [0.4.0](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.30...@carbon-platform/api@0.4.0) (2022-09-09)


### ⚠ BREAKING CHANGES

* **api:** Move trace utilities from microservice to logging dir

### Features 🌟

* **api:** add withTrace utility ([d36962c](https://github.com/carbon-design-system/carbon-platform/commit/d36962cfbbe23c578ce5836de92a13004fa5b9c3))


### Bug Fixes 🐛

* trace imports in services ([3a0fc0f](https://github.com/carbon-design-system/carbon-platform/commit/3a0fc0fa0b377c695ed5abf9e2245d424484f9f9))


### Tests 🧪

* fix failing unit tests and linting ([d5beea3](https://github.com/carbon-design-system/carbon-platform/commit/d5beea3b042d7e69dd7f53c5f2cc1b0ef6754efe))


### Misc. 🔮

* add top-level clean script to handle tsbuildinfo ([a0da1b8](https://github.com/carbon-design-system/carbon-platform/commit/a0da1b86e96ab39e6131f2889f90d71fe8e4f691))
* update node module major versions ([a30e04e](https://github.com/carbon-design-system/carbon-platform/commit/a30e04e2f89e547894208d8fda8747bb71008ae8))
* update node module minor versions ([ebc5ac5](https://github.com/carbon-design-system/carbon-platform/commit/ebc5ac527813f26eba3a7aca74574320c1067f17))

### [0.3.30](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.29...@carbon-platform/api@0.3.30) (2022-09-08)


### Features 🌟

* **logging:** use custom date format in console logs ([aeeded7](https://github.com/carbon-design-system/carbon-platform/commit/aeeded78be44f72809d13edb25c826efb6027aca))

### [0.3.29](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.28...@carbon-platform/api@0.3.29) (2022-08-25)


### Features 🌟

* add additional demo link type other ([dbe821c](https://github.com/carbon-design-system/carbon-platform/commit/dbe821cdd3bb030951775cda2649668d0003759e)), closes [#581](https://github.com/carbon-design-system/carbon-platform/issues/581)


### Bug Fixes 🐛

* **api:** enforce max length for trace and request logs ([f6443aa](https://github.com/carbon-design-system/carbon-platform/commit/f6443aa7f93ac9393e847ec2b82248373c0bbb5e))


### Misc. 🔮

* **api:** fix sonarlint errors ([300ec78](https://github.com/carbon-design-system/carbon-platform/commit/300ec785f13b26883597b9df0f6e28d3deee903c))
* **api:** remove commented out auth tests for now ([0dd6b61](https://github.com/carbon-design-system/carbon-platform/commit/0dd6b61b38aacc6026be87c924be214e1535286f))

### [0.3.28](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.27...@carbon-platform/api@0.3.28) (2022-08-24)


### Misc. 🔮

* update node modules and related documentation ([7a7a955](https://github.com/carbon-design-system/carbon-platform/commit/7a7a955ed7b12220ac79cf321c5f5e2543529e17))

### [0.3.27](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.26...@carbon-platform/api@0.3.27) (2022-08-20)


### Bug Fixes 🐛

* baseline module updates ([1a7ab2f](https://github.com/carbon-design-system/carbon-platform/commit/1a7ab2f74b9cd477c0f5d83e8f99a5e34f0668ed))


### Misc. 🔮

* rebuild lockfile and update deps minor/patch ([7bfa4e4](https://github.com/carbon-design-system/carbon-platform/commit/7bfa4e459317175233af2eaaf1b188c0a42fe8d0))


### Tests 🧪

* **mdx-components:** test infrastructure and basic snapshot testing ([1504e9f](https://github.com/carbon-design-system/carbon-platform/commit/1504e9fbbf42ef01f5a1dcac8cbd07085b2fad18))

### [0.3.26](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.25...@carbon-platform/api@0.3.26) (2022-08-18)


### Features 🌟

* **api:** create and use mdx-sanitizer package ([8649d07](https://github.com/carbon-design-system/carbon-platform/commit/8649d07fc2d6ee6408f645acdc26754fdc089cbb))
* **mdx-sanitizer:** create interfaces, add test files ([8259849](https://github.com/carbon-design-system/carbon-platform/commit/82598493a6d50e11a52561eff16c90ce5a13c6fa))
* **mdx-sanitizer:** initial file structure ([724768c](https://github.com/carbon-design-system/carbon-platform/commit/724768c65addd1ba52552ad269fd2f6fe3b25cbf))


### Bug Fixes 🐛

* **api:** remove unnecessary installs ([66dc8a5](https://github.com/carbon-design-system/carbon-platform/commit/66dc8a55e914fd9adfbed396da458be8c3926fc9))
* **logging:** allow debug to be turned off ([bfdb039](https://github.com/carbon-design-system/carbon-platform/commit/bfdb0398ee6093e1088cc383481f5a4212213942))


### Misc. 🔮

* remove console.log statements ([7159f07](https://github.com/carbon-design-system/carbon-platform/commit/7159f07cd54c70ebc960162f735fb9c2f00cdb28))

### [0.3.25](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.24...@carbon-platform/api@0.3.25) (2022-08-06)


### Misc. 🔮

* update node module minor + patch versions ([e5d1ef2](https://github.com/carbon-design-system/carbon-platform/commit/e5d1ef222370b0a0cc39d4985891aed7881a0f94))

### [0.3.24](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.23...@carbon-platform/api@0.3.24) (2022-07-30)


### Bug Fixes 🐛

* sonarcloud smells ([2b98c6a](https://github.com/carbon-design-system/carbon-platform/commit/2b98c6a896e27e77617786625ad7db43cb6a413a))

### [0.3.23](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.22...@carbon-platform/api@0.3.23) (2022-07-23)


### Misc. 🔮

* update node module major versions ([60c2787](https://github.com/carbon-design-system/carbon-platform/commit/60c27871974d539bce1270dc9ceef30ae1c5215e))
* update node module minor versions ([767b5f7](https://github.com/carbon-design-system/carbon-platform/commit/767b5f7cf5db0a0423dfa04193e64d029a022006))

### [0.3.22](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.21...@carbon-platform/api@0.3.22) (2022-07-15)


### Features 🌟

* **mdx-sanitizer:** add mdx test files ([774a59b](https://github.com/carbon-design-system/carbon-platform/commit/774a59b7e1207c6cebd0d43c34a4d164a5322fa1))


### Bug Fixes 🐛

* **web-app:** linter ([8018281](https://github.com/carbon-design-system/carbon-platform/commit/80182813ca56a2c2e45d33276ca64582b25b29e5))

### [0.3.21](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.20...@carbon-platform/api@0.3.21) (2022-07-14)


### Misc. 🔮

* bump @nestjs/graphql from 10.0.15 to 10.0.18 ([342b7a3](https://github.com/carbon-design-system/carbon-platform/commit/342b7a335edd8717cc69ed80630536ff540f4721))

### [0.3.20](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.19...@carbon-platform/api@0.3.20) (2022-06-24)


### Bug Fixes 🐛

* remove runtime usages of import.meta ([acd5277](https://github.com/carbon-design-system/carbon-platform/commit/acd5277122970037a5d8627d6fd2c3c6b14d4fe4))

### [0.3.19](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.18...@carbon-platform/api@0.3.19) (2022-06-22)


### Features 🌟

* **data-graph:** add dynamic dev devdataset reloading ([3f87565](https://github.com/carbon-design-system/carbon-platform/commit/3f87565ffb8c66e858465c7d6d35863fdf70ceac))

### [0.3.18](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.17...@carbon-platform/api@0.3.18) (2022-06-17)


### Bug Fixes 🐛

* **data-graph:** assorted bug fixes ([a039711](https://github.com/carbon-design-system/carbon-platform/commit/a039711d25a4d4073e7e118ccd7b42f40f618b30)), closes [#830](https://github.com/carbon-design-system/carbon-platform/issues/830)

### [0.3.17](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.16...@carbon-platform/api@0.3.17) (2022-06-16)


### Features 🌟

* **data-graph:** dev dataset first pass ([7f01471](https://github.com/carbon-design-system/carbon-platform/commit/7f01471210ab94d36bb13005060a7c24704efeb0)), closes [#627](https://github.com/carbon-design-system/carbon-platform/issues/627) [#628](https://github.com/carbon-design-system/carbon-platform/issues/628) [#629](https://github.com/carbon-design-system/carbon-platform/issues/629) [#626](https://github.com/carbon-design-system/carbon-platform/issues/626)

### [0.3.16](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.15...@carbon-platform/api@0.3.16) (2022-06-15)


### Misc. 🔮

* update node modules ([91ff95f](https://github.com/carbon-design-system/carbon-platform/commit/91ff95fd3d9c797f291099f3d875959010f822f0))

### [0.3.15](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.14...@carbon-platform/api@0.3.15) (2022-06-13)


### Misc. 🔮

* **api:** logging consistency in messaging classes ([ae75426](https://github.com/carbon-design-system/carbon-platform/commit/ae75426fb87254e1f8305e2bcf9f07dfb1a442d0))

### [0.3.14](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.13...@carbon-platform/api@0.3.14) (2022-06-12)


### Bug Fixes 🐛

* **api:** improve messaging connection performance and stability ([d6d0673](https://github.com/carbon-design-system/carbon-platform/commit/d6d06738ea849f3bf48f6f443ff7d5172f2eb287))

### [0.3.13](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.12...@carbon-platform/api@0.3.13) (2022-06-11)


### Bug Fixes 🐛

* **api:** avoid logging credentials in messaging URLs ([7f81735](https://github.com/carbon-design-system/carbon-platform/commit/7f81735482f8d77dd852fe6a9b770715d434feac))

### [0.3.12](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.11...@carbon-platform/api@0.3.12) (2022-06-11)


### Features 🌟

* **logging:** enhance self-debug logging ([44335b4](https://github.com/carbon-design-system/carbon-platform/commit/44335b46f814ab14a92c0472e25293bb9dc153a7))


### Bug Fixes 🐛

* **api:** even better error handling for rmq connection errors ([33dcd35](https://github.com/carbon-design-system/carbon-platform/commit/33dcd35d12aafa6ec8ae9bdbdce2d9534defa0c9))

### [0.3.11](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.10...@carbon-platform/api@0.3.11) (2022-06-10)


### Bug Fixes 🐛

* **web-app:** app hangs when disconencting from message broker ([bfe11fa](https://github.com/carbon-design-system/carbon-platform/commit/bfe11fa053859ce41c411e68071df433901f4499))

### [0.3.10](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.8...@carbon-platform/api@0.3.10) (2022-05-21)


### Misc. 🔮

* **api:** bump api package version ([c8293de](https://github.com/carbon-design-system/carbon-platform/commit/c8293def230f23692000ee06d65a3f43e84c377e))

### [0.3.8](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.7...@carbon-platform/api@0.3.8) (2022-05-21)


### Tests 🧪

* **api:** add gql unit tests ([112694f](https://github.com/carbon-design-system/carbon-platform/commit/112694f7846460bcbf24501ae273d131fd5937cc))


### Bug Fixes 🐛

* **api:** correct demo links object in libraries model ([3226541](https://github.com/carbon-design-system/carbon-platform/commit/3226541a189fd076533bd6db891c36375d12db31))
* **api:** removing unused query result field ([3ed347f](https://github.com/carbon-design-system/carbon-platform/commit/3ed347fe51f29255d0b28ce1a1b5e3d5ec0f430b))
* **api:** trace no longer loses method metadata ([9f7e09f](https://github.com/carbon-design-system/carbon-platform/commit/9f7e09f34d6b7385cd9097c8f75ec5e50d4fd4cb))
* code review updates ([2da921f](https://github.com/carbon-design-system/carbon-platform/commit/2da921faa5c00cb15cbbc70f9cd416b6f6c9216c))
* **logging:** double logging ([5eb660b](https://github.com/carbon-design-system/carbon-platform/commit/5eb660b0c80fc95b66d16150f42bd398d64b8e9d)), closes [#593](https://github.com/carbon-design-system/carbon-platform/issues/593)


### Features 🌟

* **api:** allow dynamic loading of rest api modules ([37d7835](https://github.com/carbon-design-system/carbon-platform/commit/37d783561154c9aa67846309a36d9d3738a572f3))
* **api:** platform microservice ([72515be](https://github.com/carbon-design-system/carbon-platform/commit/72515be7670746fc2d65f7511e1bf20666a45829))
* **data-graph:** finalize directory structure and layout ([e8b0c41](https://github.com/carbon-design-system/carbon-platform/commit/e8b0c410c1fb017c8398bb52b53de7668ec6aeb6))
* **data-graph:** finish port of PoC code ([18895af](https://github.com/carbon-design-system/carbon-platform/commit/18895af536abe1130eec64b1454f703e171abc07)), closes [#631](https://github.com/carbon-design-system/carbon-platform/issues/631) [#632](https://github.com/carbon-design-system/carbon-platform/issues/632) [#633](https://github.com/carbon-design-system/carbon-platform/issues/633)
* **data-graph:** hook up to messaging ([4ca8f3b](https://github.com/carbon-design-system/carbon-platform/commit/4ca8f3b5935eef856fb8f4f089c68a0b8f5b0caa))
* **data-graph:** massive schema improvements ([eb19bb2](https://github.com/carbon-design-system/carbon-platform/commit/eb19bb22c5e58504a128ebd74478d2c0f73eade9))
* **messaging:** improve typing on messaging and microservices ([361cbd2](https://github.com/carbon-design-system/carbon-platform/commit/361cbd2323d3039a08affe6b1becf76e9830c058))
* wrong queue name in emit and query ([73844db](https://github.com/carbon-design-system/carbon-platform/commit/73844dbde3a2ee8a404b668a9a4015e4f5cc9204))

### [0.3.7](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.6...@carbon-platform/api@0.3.7) (2022-05-11)


### Misc. 🔮

* update node modules ([6141d89](https://github.com/carbon-design-system/carbon-platform/commit/6141d89dfb62132d0fe9477ba47519fd5f413e0f))

### [0.3.6](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.5...@carbon-platform/api@0.3.6) (2022-05-06)


### Misc. 🔮

* update node modules (minor-only) ([f87a33b](https://github.com/carbon-design-system/carbon-platform/commit/f87a33bc6575b5c8acc4bee4f1abd0d917f3ad64))

### [0.3.5](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.4...@carbon-platform/api@0.3.5) (2022-04-30)


### Misc. 🔮

* update node modules ([7b05aa4](https://github.com/carbon-design-system/carbon-platform/commit/7b05aa4fd0ec90d343e3fbe5a9a5d8ee8e238f27))

### [0.3.4](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.3...@carbon-platform/api@0.3.4) (2022-04-09)


### Bug Fixes 🐛

* **web-app:** cr comments, consolidate secure-server with proxy-server ([c45ae8e](https://github.com/carbon-design-system/carbon-platform/commit/c45ae8e63c06a1d8c167ed583408ba4c3715b312))

### [0.3.3](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.2...@carbon-platform/api@0.3.3) (2022-03-31)


### Bug Fixes 🐛

* sonarlint var usage code smells ([663404e](https://github.com/carbon-design-system/carbon-platform/commit/663404ef4b78d1baca73634f3b78b301653eb4f2))

### [0.3.2](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.1...@carbon-platform/api@0.3.2) (2022-03-30)


### Misc. 🔮

* update node modules ([2da3f3a](https://github.com/carbon-design-system/carbon-platform/commit/2da3f3acd0b4513ba2e29b43151587e70219bcb8))

### [0.3.1](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.3.0...@carbon-platform/api@0.3.1) (2022-03-25)


### Bug Fixes 🐛

* **logging:** no longer remote logging in build environment ([5f4c8da](https://github.com/carbon-design-system/carbon-platform/commit/5f4c8da407434456c655f5294467480f17ad6898))

## [0.3.0](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.17...@carbon-platform/api@0.3.0) (2022-03-23)


### ⚠ BREAKING CHANGES

* **api:** RunMode.Prod has been replaced with RunMode.Standard

### Features 🌟

* **api:** rename prod run mode to standard to avoid confusion ([1664681](https://github.com/carbon-design-system/carbon-platform/commit/16646815268838b5b196892d1bd809bb1a461f0b)), closes [#412](https://github.com/carbon-design-system/carbon-platform/issues/412)

### [0.2.17](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.16...@carbon-platform/api@0.2.17) (2022-03-22)


### Bug Fixes 🐛

* **web-app:** update @carbon/react and other packages ([eac0c0d](https://github.com/carbon-design-system/carbon-platform/commit/eac0c0d397209bee13b8818055e2f9a075922253))

### [0.2.16](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/api@0.2.15...@carbon-platform/api@0.2.16) (2022-03-09)


### Misc. 🔮

* lock file rebuild ([712c37d](https://github.com/carbon-design-system/carbon-platform/commit/712c37d59c92919bb5b08e7d37ffb5664cec4318))
* update node modules ([d2bcb5a](https://github.com/carbon-design-system/carbon-platform/commit/d2bcb5adf89a8e90e03daa2b8d4f00343343d0b6))

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
