# Icons package

This package bundles all project-specific SVG icons in a node module.

It uses the `svgr` CLI and typescript to turn a source set of SVG icons into a resultant set of
React components. The steps are:

1. Use `svgr` to convert icons in `src/main/svg` to tsx components in `src/main/generated`.
1. Run a typescript build to convert the `generated` components into ES2020 modules in the `dist`
   folder.

## Contribution

To add a new icon that isn't available as a
[Carbon Icon](https://carbondesignsystem.com/guidelines/icons/library/) or
[Carbon Pictogram](https://carbondesignsystem.com/guidelines/pictograms/library/):

1. Download the latest [Sketch file from Box](https://ibm.ent.box.com/folder/158366227035).
1. Add attribution where required so we can do manual open-source audits for all icons that didn't
   come from Carbon icon and pictogram code packages.
1. Size the SVG at its intended size so we can be pixel-precise for standard density displays (SVGs
   can get resized in the web app so this isn't overly important.)
1. Include an internal 2px padding for 32px icons per
   [IBM Design Language specifications](https://www.ibm.com/design/language/iconography/ui-icons/design/#padding)
   (1px padding for 16px icons.)
1. Ensure the fill colors are all black.
1. Use a slice to export the SVG (so we can preserve internal padding.)
1. Place the SVG in the path specified above.
1. Run a build prior to using the optimized SVGs as React components in the web app.
1. Upload the new version of the Sketch file to Box.
