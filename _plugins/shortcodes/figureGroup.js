//
// CUSTOMIZED FILE
// Added optional group figure caption, and optional class, and simplify output to remove rows
//
const { html } = require('~lib/common-tags')
const chalkFactory = require('~lib/chalk')
const figure = require('./figure')

const logger = chalkFactory('shortcodes:figureGroup')

/**
 * Render multiple <figure> elements in a group
 *
 * @param      {Object}  eleventyConfig  eleventy configuration
 * @param      {Array<id>}  ids          An array or list of figure identifiers
 * @return     {String}  An HTML string of the elements to render
 */
module.exports = function (eleventyConfig, { page }) {
  const figureCaption = eleventyConfig.getFilter('figureCaption')

  return async function (columns, ids=[], caption, classes) {
    columns = parseInt(columns)

    /**
     * Parse the ids arg for figure identifiers
     * The ids arg can be either a string of comma separated figure ids,
     * @example 'fig-1, fig-2, fig-3'
     * or an array of identifier strings
     * @example ['fig-1', 'fig-2', 'fig-3']
     */
    ids = Array.isArray(ids) ? ids : ids.split(',').map((id) => id.trim())

    if (!ids.length) {
      logger.warn(`NoId: the figuregroup shortcode must include one or more 'id' values that correspond to an 'id' in the 'figures.yaml' file. @example {% qfiguregroup columns=2, ids='3.1, 3.2, 3.3' %}`)
    }

    const figureClasses = classes ? classes : ''

    let figures = '';
    for (let i=0; i < ids.length; i++) {
      figures += await figure(eleventyConfig, { page })(ids[i]);
    }

    const captionElement = caption ? figureCaption({ caption }) : ''

    return html`
      <figure class="q-figure q-figure--group q-figure--group--${columns} ${figureClasses}">
        ${figures}
        ${captionElement}
      </figure>
    `
  }
}
