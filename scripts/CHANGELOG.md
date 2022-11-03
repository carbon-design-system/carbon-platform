# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.5](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/scripts@0.2.4...@carbon-platform/scripts@0.2.5) (2022-11-03)


### Misc. 🔮

* update node module minor versions ([8a57897](https://github.com/carbon-design-system/carbon-platform/commit/8a578978d5342d0ae06c8e789ebeba43461cd824))

### [0.2.4](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/scripts@0.2.3...@carbon-platform/scripts@0.2.4) (2022-10-18)


### Misc. 🔮

* improve clean scripts ([55da50d](https://github.com/carbon-design-system/carbon-platform/commit/55da50d5ba7ed9fac83ad09471152cd7c6c8d9a5))

### [0.2.3](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/scripts@0.2.2...@carbon-platform/scripts@0.2.3) (2022-10-13)


### Misc. 🔮

* update package.json repo and bugs links ([3c089cd](https://github.com/carbon-design-system/carbon-platform/commit/3c089cdde1ddde2a3b9f750680755c4253bfcae2))

### [0.2.2](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/scripts@0.2.1...@carbon-platform/scripts@0.2.2) (2022-10-06)


### Misc. 🔮

* add tsconfig.tsbuildinfo to clean scripts for all ts workspaces ([edcdaaa](https://github.com/carbon-design-system/carbon-platform/commit/edcdaaa1a1175a34f16d97e497f8d51bfe827673))

### [0.2.1](https://github.com/carbon-design-system/carbon-platform/compare/@carbon-platform/scripts@0.2.0...@carbon-platform/scripts@0.2.1) (2022-09-09)


### Misc. 🔮

* add top-level clean script to handle tsbuildinfo ([a0da1b8](https://github.com/carbon-design-system/carbon-platform/commit/a0da1b86e96ab39e6131f2889f90d71fe8e4f691))

## 0.2.0 (2022-09-08)


### ⚠ BREAKING CHANGES

* **micromanage:** This is a complete rewrite of the command interfaces.

### Misc. 🔮

* add build logic to micromanage publish ([96eb56e](https://github.com/carbon-design-system/carbon-platform/commit/96eb56e9bbb7ed29fb4ba47b86a2a4d6c466c1fc))
* cleanup unused files and content ([3235cc8](https://github.com/carbon-design-system/carbon-platform/commit/3235cc839f6baa62df26c77f018339b21fa40b53))
* default docker builds to prod run mode ([c1e380b](https://github.com/carbon-design-system/carbon-platform/commit/c1e380b12ad06465c37d07baf6f5f7388c31e016))
* docker updates ([fcb4784](https://github.com/carbon-design-system/carbon-platform/commit/fcb47848e6371e48abc985a0c18c02fd5038f36c))
* fix npm publish logic ([fc447a1](https://github.com/carbon-design-system/carbon-platform/commit/fc447a1de04574c7a5f30aeb2f80dfedf67316a6))
* improve failure reporting of docker builds/pushes ([a3e6a0c](https://github.com/carbon-design-system/carbon-platform/commit/a3e6a0c8cde9eefa5b8ae2159960a5d3baeb92af))
* **logging:** add missing types dep ([89541ed](https://github.com/carbon-design-system/carbon-platform/commit/89541edc6f727dd22d423d3e1ecb6bb82bef0a8a))
* **micromanage:** add dry-run option to version command ([6a561ba](https://github.com/carbon-design-system/carbon-platform/commit/6a561ba072ae1d7e64f89ae8a19a21e09eab5186))
* **micromanage:** add realtime output to docker builds ([3662a82](https://github.com/carbon-design-system/carbon-platform/commit/3662a82c519163c7103a658dfded19798af8eea9))
* **micromanage:** adjust deploy structure ([cc9aeb3](https://github.com/carbon-design-system/carbon-platform/commit/cc9aeb3419d52f22bf3dc87073b4d2ef655ed494))
* **micromanage:** adjust exit code ([b136362](https://github.com/carbon-design-system/carbon-platform/commit/b136362b4b65cc5681af83ac5316008738dbb645))
* **micromanage:** code review updates ([47e6241](https://github.com/carbon-design-system/carbon-platform/commit/47e624168653f23dc58f45ea4196022031450dea))
* **micromanage:** convert micromanage to a package ([41aa60d](https://github.com/carbon-design-system/carbon-platform/commit/41aa60dedfd326e8c141dc29a0587f8dfa454a2c))
* **micromanage:** fix getPackages function ([90c5820](https://github.com/carbon-design-system/carbon-platform/commit/90c58203f86cc513b85900e4ee4a74da7d27a978))
* **micromanage:** improve link ([98ae3c1](https://github.com/carbon-design-system/carbon-platform/commit/98ae3c1ee9b1ab82814ec51b263521dee78650dd))
* **micromanage:** switch to spawn for commands needing output ([9352b5f](https://github.com/carbon-design-system/carbon-platform/commit/9352b5f05d406ada1137074b1065b1337082ce3b))
* **micromanage:** terminology consistency update ([073552b](https://github.com/carbon-design-system/carbon-platform/commit/073552b96b79c290faf55c82b0e42eb48f27c899))
* **micromanage:** update publish logic ([372bed6](https://github.com/carbon-design-system/carbon-platform/commit/372bed690abca211a6159820d8c1cacebbd59c5a))
* **micromanage:** use spawn instead of exec on deploy script ([bdbac9d](https://github.com/carbon-design-system/carbon-platform/commit/bdbac9d468672270f17d550fdd8569efc6f16559))
* **micromanage:** version: updated packges now trigger service updates ([8286499](https://github.com/carbon-design-system/carbon-platform/commit/82864990f215869ccfff4346ea64047eeedbb252))
* query apps by org and space,remove data from webapp .cfignore ([fcaf5d5](https://github.com/carbon-design-system/carbon-platform/commit/fcaf5d5387210493fffc43046abc67da5d32234e))
* remove ignore-scripts ([dd058c1](https://github.com/carbon-design-system/carbon-platform/commit/dd058c1da7566c15c08203d883f30f8501b3b054))
* scaffolding for deploy logic ([8197fe9](https://github.com/carbon-design-system/carbon-platform/commit/8197fe9813c8d154d59ddf3c7ad219b82936c18a))
* simplify workflow and add micromanage ([9508266](https://github.com/carbon-design-system/carbon-platform/commit/9508266ffb389ec68a009d6cc0468ccb371f3384))
* update docker-related automation ([c5c50ab](https://github.com/carbon-design-system/carbon-platform/commit/c5c50abc0b3f193300946b7745a78c197634b432))
* update micromanage deploy ([300b15b](https://github.com/carbon-design-system/carbon-platform/commit/300b15be96a4d9a828afdaceeb5765f97dc8b183))
* update node modules ([d2bcb5a](https://github.com/carbon-design-system/carbon-platform/commit/d2bcb5adf89a8e90e03daa2b8d4f00343343d0b6))
* update some deploy script logic ([707c1f6](https://github.com/carbon-design-system/carbon-platform/commit/707c1f6f6d227a42d21de405a4c15d5940879c26))


### Features 🌟

* add deployment script ([a820da4](https://github.com/carbon-design-system/carbon-platform/commit/a820da47bb51ea438a0d488a8d4d720666d75c70))
* add linting and formatting, first pass ([bebe0cb](https://github.com/carbon-design-system/carbon-platform/commit/bebe0cba38d179fe7f9697f6ea56e1c42c8def16))
* **api:** create api package ([c600bea](https://github.com/carbon-design-system/carbon-platform/commit/c600bea03431c537cec70a5353d650f099e990fb))
* **data-graph:** massive schema improvements ([eb19bb2](https://github.com/carbon-design-system/carbon-platform/commit/eb19bb22c5e58504a128ebd74478d2c0f73eade9))
* **icons:** add new icons package ([#56](https://github.com/carbon-design-system/carbon-platform/issues/56)) ([3d9144c](https://github.com/carbon-design-system/carbon-platform/commit/3d9144c019cff7f4271c6ab0e13cd6939c8f7847))
* **mdx-components:** add storybook and 2 components ([532b421](https://github.com/carbon-design-system/carbon-platform/commit/532b4219420e951f44a54ce2ba21fcac5c4e070f))
* **micromanage:** convert deploy to use dotenv ([8edaa17](https://github.com/carbon-design-system/carbon-platform/commit/8edaa174c937ef11aca1614c13d1e0db8f7e82c6))
* **micromanage:** huge improvements and rework ([67285a6](https://github.com/carbon-design-system/carbon-platform/commit/67285a690cc7fb71a1bd7105b1b59e544d713704))
* **micromanage:** refactor micromanage to its own package ([6013009](https://github.com/carbon-design-system/carbon-platform/commit/6013009b041a8ea296d788f772da53f6c8d32655))
* remove linking of local packages ([7704e40](https://github.com/carbon-design-system/carbon-platform/commit/7704e4087bc4272d55834f763de5c9a4d97fc8dc))


### Bug Fixes 🐛

* ensure carbon cds prefix is used ([10496f6](https://github.com/carbon-design-system/carbon-platform/commit/10496f6ef000a5da9d1da211ae4369707cb7d011))
* eslint config updates ([d9dc917](https://github.com/carbon-design-system/carbon-platform/commit/d9dc917b7d368fe67f534697db1c5009a19a8e4b))
* merge conflicts ([76c90a0](https://github.com/carbon-design-system/carbon-platform/commit/76c90a04864b4950e4eaef8c3cc86389f1f64623))
* **micromanage:** add envvars to deploy scripts ([41ab70a](https://github.com/carbon-design-system/carbon-platform/commit/41ab70a11a0356213ae2fed7ab988d7b7214583e))
* **micromanage:** add shell command guards ([68d7901](https://github.com/carbon-design-system/carbon-platform/commit/68d7901f24482f3cb2322d7114585ac0a63c1b33))
* **micromanage:** correct deploy ignores ([8da395c](https://github.com/carbon-design-system/carbon-platform/commit/8da395c14505fd7776bad9d4bb2d3b6aeb3fe3fb))
* **micromanage:** handle non-zero return codes ([a03de55](https://github.com/carbon-design-system/carbon-platform/commit/a03de550778c79f7592d197f626e2f088ae39b5f))
* resolve merge conflicts ([04aaa6b](https://github.com/carbon-design-system/carbon-platform/commit/04aaa6b4d27cbd4ed11e6c66845ab84f3eb39b5d))
* **web-app:** linter styling issue ([95ed5b0](https://github.com/carbon-design-system/carbon-platform/commit/95ed5b01924a2c83334754e889a8b71ed9ed3150))
* wrong import in publish script ([edea7a8](https://github.com/carbon-design-system/carbon-platform/commit/edea7a803938e9205c67d23de9ac95b26c39b028))
