//
// CUSTOMIZED FILE
// Output "thing" pages with an image
//
const path = require ('path')
const { html, oneLine } = require('~lib/common-tags')

/**
 * Renders a TOC list item
 *
 * @param     {Object} context
 * @param     {String} params
 * @property  {Array} children - The TOC page item's child pages
 * @property  {String} page - The TOC item's page data
 * @property  {String} presentation How the TOC should display. Possible values: ['abstract', 'brief']
 *
 * @return {String} TOC list item markup
 */
module.exports = function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const icon = eleventyConfig.getFilter('icon')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const removeHTML = eleventyConfig.getFilter('removeHTML')
  const urlFilter = eleventyConfig.getFilter('url')
  const { contributorDivider } = eleventyConfig.globalData.config.tableOfContents
  const { imageDir } = eleventyConfig.globalData.config.figures

  return function (params) {
    const {
      children='',
      classes=[],
      page,
      presentation
    } = params

    const {
      abstract,
      contributor: pageContributors,
      image,
      label,
      layout,
      short_title,
      subtitle,
      summary,
      tags,
      title
    } = page.data

    /**
     * Check if item is a reference to a built page or just a heading
     * @type {Boolean}
     */
    const isPage = !!layout

    const imageFile = image 
        ? image
        : 'figures/' + page.key.replace(' ', '-') + '.jpg'

    const imageElement = tags == 'thing'
      ? `<img src='${path.join(imageDir, imageFile)}' alt='Small thumnail image of a ${title}' />`
      : ''

    let pageTitleElement
    if (presentation === 'brief') {
      pageTitleElement = short_title || title
    } else {
      pageTitleElement = oneLine`<span class="page-item-title">${pageTitle({ label, subtitle, title })}</span>`
    }

    // Returns abstract with any links stripped out
    const abstractText =
      presentation === 'abstract' && (abstract || summary)
        ? `<div class="abstract-text">${ removeHTML(markdownify(abstract)) }</div>`
        : ''

    let mainElement = `${markdownify(pageTitleElement)}`

    if (isPage) {
      mainElement = `<a href="${urlFilter(page.url)}">${mainElement}${imageElement}</a>`
    } else {
      classes.push('no-landing')
    }

    return html`
      <li class="${classes.join(' ')}">
        ${mainElement}
        ${abstractText}
        ${children}
      </li>
    `
  }
}
