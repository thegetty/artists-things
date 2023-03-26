## Quire Eleventy

The [Quire Eleventy package](https://github.com/thegetty/quire/tree/main/packages/11ty) contains configuration and modules for the [Eleventy static site generator](https://11ty.dev). This package is published to npm as [`@thegetty/quire-11ty`](https://www.npmjs.com/package/@thegetty/quire-11ty) and installed by the [`@thegetty/quire-cli`](https://www.npmjs.com/package/@thegetty/quire-cli) to build [Quire](https://quire.getty.edu) projects.

### New and Customized Template Files

**_includes/components/icons.js**
Added custom search icon

**_includes/components/navigation.js**
Altered to show current page title instead of homepage link

**_includes/components/page-header.js**
Added a list of 'owners'

**_includes/components/table-of-contents/item/list.js**
Output the list item for 'thing' pages with an image

**_includes/web-components/modal/index.js**
Altered getCurrentFigureId() to work with .q-figure__modal-link class anywhere

**_layouts/thing.liquid**
Copied essay.liquid, except that it adds owners to the pageHeader and a `.thing-info` grid to display type, theme, and material.

**_plugins/filters/lowerCase.js**
**_plugins/filters/index.js**
Added new filter to convert string to lower case, for use in Liquid tempates

**_plugins/shortcodes/index.js**
**_plugins/shortcodes/thing.js**
Created a new shortcode to create a pop-up with full data and links for a given "thing"

**_plugins/shortcodes/contributors.js**
Refactored logic to handle oxford commas correctly; and added handling to display contributor `symbol

**_plugins/shortcodes/figureRef.js**
Refactored to accept comma-separated array, and to output with .q-figure__modal-link class