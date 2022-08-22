# MDX Components package

The set of components renderable in MDX files on the Carbon Platform.

Each component has a folder containing its assets and storybook stories. There is a typescript build
and a Sass build to compile JavaScript and styles, respectively.

## Using this package

This package exports two things:

1. A set of React components (including some base Carbon components) that are available for use in
   Carbon Platform MDX files
2. A css file including the styles for the React components, but **not including** the styles for
   the base Carbon components.

**To use this package, you'll need to do the following:**

1. Include the base Carbon component styles in your application
2. Include the @carbon-platform/mdx-components styles in your application via the
   `@carbon-platform/mdx-components/styles` export
3. Import React components from `@carbon-platform/mdx-components` and use them in your application.
   Example:

   ```jsx
   import { Button, ColorBlock } from '@carbon-platform/mdx-components'

   // ...
   return (
     <>
       <ColorBlock>#0066ff</ColorBlock>
       <Button>Hello!</Button>
     </>
   )
   // ...
   ```

## Developing

There is a convenience script available: `npm run dev`. This does two things:

1. Runs `npm run build:watch`, which uses Nodemon to monitor component files for changes and
   re-trigger TypeScript and Sass builds accordingly.
2. Runs `npm run storybook` to serve the Storybook web app on a local port.

This can be used during development to build component changes and see them reflected in the
storybook.

These are broken into two steps because the components are written in TypeScript, so they need to be
compiled (via `tsc`) into JavaScript for external use and for use by Storybook. The `tsc` build puts
the output files in the `dist/main` folder. Storybook imports the components from the index file in
that folder for display.

Stories themselves are written in plain JavaScript (jsx) to avoid any unnecessary complexity.

## Style considerations

To style components, the base `@carbon/styles` css needs to be included, along with the `index.css`
file that is output during the Sass build.

Each component must use the style "prefix" in both its React component and its corresponding scss
file(s). This is to ensure no style collisions with other components/libraries. There are two
utilities available to assist with this:

- **For TypeScript/React:** `withPrefix(string)`

  - Given an input string, this adds the correct style prefix so that the return value can be used
    as a class name on a component with no further modification.

  - Example:

    ```tsx
    import { withPrefix } from '../utils.js'

    return <span className={withPrefix('my-component')} />
    ```

- **For Sass:** `with-prefix(string)`

  - Given an input string, this adds the correct style prefix so that the return value can be used
    as a class selector in a sass file.

  - Example:

    ```scss
    @use '../utils' as *;

    .#{with-prefix('my-component')} {
      /* ... */
    }
    ```
