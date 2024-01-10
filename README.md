This is the repository for *Artists' Things*, by Katie Scott and Hannah Williams. This digital book was first published January 9, 2024, by the Getty Research Institute. It is available online at https://www.getty.edu/publications/artists-things/ and may be downloaded there free of charge in multiple formats.

## About the Book

Artists are makers of things. Yet it is a measure of the disembodied manner in which we generally think about artists that we rarely consider the everyday items they own. This innovative book looks at objects that once belonged to artists, revealing not only the fabric of the eighteenth-century art world in France but also unfamiliar—and sometimes unexpected—insights into the individuals who populated it, including Jean-Antoine Watteau, François Boucher, Jean-Baptiste Greuze, and Elisabeth Vigée-LeBrun.

From the curious to the mundane, from the useful to the symbolic, these items have one thing in common: they have all been eclipsed from historical view. Some of the objects still exist, like Jean-Honoré Fragonard’s color box and Jacques-Louis David’s table. Others survive only in paintings, such as Jean-Siméon Chardin’s cistern in his *Copper Drinking Fountain*, or in documents, like François Lemoyne’s sword, the instrument of his suicide. Several were literally lost, including pastelist Jean-Baptiste Perronneau’s pencil case. In this fascinating book, the authors engage with fundamental historical debates about production, consumption, and sociability through the lens of material goods owned by artists.

## Using this Repository

This is one in series of multiformat publications using [Quire](http://quire.getty.edu)™, Getty’s multiformat publishing tool. 

We are dedicated to maintaining this publication for years to come at the permanent URL, https://www.getty.edu/publications/artists-things/, and in its various formats and incarnations. For any updates to the book, we will be following something between an app and traditional book publication model. Updates will only be made in regulated chunks as formal revisions and new editions and will always be thoroughly documented here in the repository, as well as in the revision history included with each of the book’s many formats.

The primary content pieces of the book can be found in the `content` directory. The `main` branch represents the current, published edition at all times, and the `revisions` branch, when present, will show changes currently under consideration. We invite you to submit suggestions or corrections via pull request on the revisions branch, by posting an issue, or by emailing us at [pubsinfo@getty.edu](mailto:pubsinfo@getty.edu).

## Development Notes

This project was last built with the following software versions:

- Node 18.16.0
- Quire CLI 1.0.0-rc.11

### Branches

| branch | about |
| --- | --- |
| `main` | The primary branch |
| `first-pages`, `second-pages`, `final-pages`| Versions of the project at various staages |
| `forthcoming` | A static placeholder page that was displayed at the book’s final URL on getty.edu prior to publication |
| `revisions` | Any revisions currently under consideration but not yet published |

### Figure Images Submodule

Many of figure images for *Artists' Things* are licensed from third parties for use exclusively in this publication. As such, they are kept in a separate, private repository, https://github.com/thegetty/artists-things/, which is linked to this main publication repository as a submodule in `content/_assets/images/figures/`. When cloning this repo for further development, you’ll permissions for the private repository and will need to clone recursively in order to clone both the main repo and the submodule.

```
git clone --recursive https://github.com/thegetty/artists-things.git
```

### Previewing the Online Edition Locally

1. Install Node.js 18.16.0 and verify with with `node --version`

2. Install the Quire CLI with `npm install -g @thegetty/quire-cli@1.0.0-rc.11`

3. Clone this repository and select the appropriate branch

4. Run `npm install` to install the project dependencies (this just needs to be done once when first cloning the project, or whenever the core template/code files are updated)

5. Change the `url` in `content/_data/publication.yaml` to `http://localhost:8080/`

6. See the preview with `quire preview`

## Creating an EPUB Version

1. Run `quire build`

2. In `_epub/page-03_pdf-epub-contents.xhtml`, find and replace the one instance of `<a href="contents/">` with `<a href="page-07_things.xhtml">`

## Creating a PDF Version

1. Run `quire build`

2. In `_site/pdf.html`, find and replace the ones instance of `<a href="#page-contents">` with `<a href="#page-things">` to ensure page numbering for "Thing" section page is correct.

3. If the PDF will be sent to digital printer, run the following commands to ensure color profiles are correct:

    ```
    magick mogrify -profile bin/adobe-rgb-1998.icm _site/iiif/**/print-image.jpg
    ```

    ```
    magick mogrify -colorspace Gray -profile bin/gray-gamma-2-2.icm _site/iiif/fig-052/052/print-image.jpg
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

**_includes/components/head.js**
Add apple icon and configure as mobile app

**_includes/components/figure/caption.js**
Don't output any HTML if there aren't caption elements

**_includes/components/head.js**
**_includes/components/head-tags/opengraph.js**
**_includes/components/head-tags/twitter-card.js**
Update and clean-up handling for social sharing

**_includes/components/license-icons.js**
Exclude SVG icons from EPUB output

**_includes/components/menu/item.js**
**_includes/components/table-of-contents/item/list.js**
**content/_computed/eleventyComputed.js**
Handle a page redirect, so that the Things page goes to Contents

**_includes/components/object-filters/objects-catalog.webc**
Added a change from https://github.com/thegetty/quire/pull/872, to allow objects-page at root level, and fix CSS syntax error

**_includes/components/navigation.js**
Altered to show current page title instead of homepage link, as well as a link to the contents ("Things") page

**_includes/components/page-header.js**
Added a list of 'owners' and an html element for the PDF footers

**_includes/components/table-of-contents/item/list.js**
Output the list item for 'thing' pages with an image

**_includes/web-components/modal/index.js**
Altered getCurrentFigureId() to work with .q-figure__modal-link class anywhere

**_layouts/cover.liquid**
Hardcodes an array of images to make up various covers, and add adds visually-hidden class to the main title texts

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

**_plugins/shortcodes/open.js**
Custom shortcode based on the old `ref` shortocode, except refactored to accept comma-separated array, and to output with .q-figure__modal-link class

**content/_assets/styles/epub.scss**
Replace default styles with simpler, cleaner version

**content/_assets/javascript/application/index.js**
Allow only one pop-up to be open at a time

## License

© 2024 J. Paul Getty Trust

The text of this work is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="license">Creative Commons Attribution-NonCommercial 4.0 International License</a>. All images are reproduced with the permission of the rights holders acknowledged in captions and are expressly excluded from the CC BY-NC license covering the rest of this publication. These images may not be reproduced, copied, transmitted, or manipulated without consent from the owners, who reserve all rights. 
