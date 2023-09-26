## Quire Eleventy

The [Quire Eleventy package](https://github.com/thegetty/quire/tree/main/packages/11ty) contains configuration and modules for the [Eleventy static site generator](https://11ty.dev). This package is published to npm as [`@thegetty/quire-11ty`](https://www.npmjs.com/package/@thegetty/quire-11ty) and installed by the [`@thegetty/quire-cli`](https://www.npmjs.com/package/@thegetty/quire-cli) to build [Quire](https://quire.getty.edu) projects.

## Creating a PDF Version

1. Run `quire build`

2. In `_site/pdf.html`, find and replace the ones instance of `<a href="#contents">` with `<a href="#things">` to ensure page numbering for "Thing" section page is correct.

3. If the PDF will be sent to digital printer, run the following command to ensure color profiles are correct:

    ```
    magick mogrify -profile bin/adobe-rgb-1998.icm _site/iiif/**/print-image.jpg
    ```

4. With PrinceXML 14.2 installed, run `quire pdf --lib prince`

5. On page 392 of the resulting PDF (book page 384), delete the horizontal rule line at the bottom of the page.

Note: We were originally planning on using Paged.js to output this project, however, it is outputting rich black text, which increases print cost and lowers print quality. Also, this important bit of CSS, which adds commas to the things in the List of Owners, wasn't working in Paged.js whereas it does in Prince. And Prince offers some other layout benefits we'll be able to take advantage of.

```css
#owners-list li .quire-citation + .quire-citation::before { content: ", "; }
```

## New and Customized Template Files

**_includes/components/analytics.js**
**_layouts/base.11ty.js**
Added Google Analytics 4

**_includes/components/copyright/licensing.js**
Updated licensing language

**_includes/components/icons.js**
Added custom search icon

**_includes/components/figure/caption.js**
Don't output any HTML if there aren't caption elements

**_includes/components/menu/item.js**
**_includes/components/table-of-contents/item/list.js**
**content/_computed/eleventyComputed.js**
Handle a page redirect, so that the Things page goes to Contents

**_includes/components/table-of-contents/list/index.js**
Added three dropdown selects for the thing grid

**_includes/components/navigation.js**
Altered to show current page title instead of homepage link, as well as a link to the contents ("Things") page

**_includes/components/page-header.js**
Added a list of 'owners' and an html element for the PDF footers

**_includes/components/table-of-contents/item/list.js**
Output the list item for 'thing' pages with an image

**_includes/web-components/modal/index.js**
Altered getCurrentFigureId() to work with .q-figure__modal-link class anywhere

**_layouts/cover.liquid**
Accepts an array of images stacked on top of one another, and add adds visually-hidden class to the main title texts

**_layouts/splash.liquid**
Added an html element for the PDF footers

**_layouts/thing.liquid**
Copied essay.liquid, except that it adds owners to the pageHeader and a `.thing-info` grid to display type, theme, and material.

**_plugins/shortcodes/index.js**
Registered the new `abbr` and `thing` shortcodes

**_plugins/shortcodes/abbr.js**
Created a new shortcode to wrap abbreviations in the text. Currently just adds a `title` attribute.

**_plugins/shortcodes/thing.js**
Created a new shortcode to create a pop-up with full data and links for a given "thing"

**_plugins/shortcodes/contributors.js**
Refactored logic to handle oxford commas correctly; and added handling to display contributor `symbol

**_plugins/shortcodes/figureRef.js**
Refactored to accept comma-separated array, and to output with .q-figure__modal-link class
