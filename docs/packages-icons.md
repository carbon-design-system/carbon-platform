# Packages - icons

This package bundles all project-specific svg icons in a node module.

It uses the `svgr` CLI and typescript to turn a source set of svg icons into a resultant sent of
react components. The steps are:

1. Use `svgr` to convert icons in `src/main/svg` to tsx components in `src/main/tsx-generated`.

2. Run a typescript build to convert the `tsx-generated` components into ES2020 modules in the
   `dist` folder.
