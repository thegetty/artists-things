## Quire Eleventy

The [Quire Eleventy package](https://github.com/thegetty/quire/tree/main/packages/11ty) contains configuration and modules for the [Eleventy static site generator](https://11ty.dev). This package is published to npm as [`@thegetty/quire-11ty`](https://www.npmjs.com/package/@thegetty/quire-11ty) and installed by the [`@thegetty/quire-cli`](https://www.npmjs.com/package/@thegetty/quire-cli) to build [Quire](https://quire.getty.edu) projects.

### New and Customized Template Files

**_includes/components/page-header.js**
adds a list of 'owners'

**_layouts/thing.liquid**
A copy of essay.liquid, except that it adds owners to the pageHeader and a `.thing-info` grid to display type, theme, and material.
