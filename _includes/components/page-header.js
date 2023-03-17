//
// CUSTOMIZED FILE
// adds a list of 'owners', lines 28, 61–77
//
const { html } = require('~lib/common-tags')
const path = require('path')

/**
 * Publication page header
 *
 * @param      {Object}  eleventyConfig
 */
module.exports = function(eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const slugify = eleventyConfig.getFilter('slugify')

  const { labelDivider } = eleventyConfig.globalData.config.pageTitle
  const { imageDir } = eleventyConfig.globalData.config.figures

  return function (params) {
    const {
      byline_format: bylineFormat,
      image,
      label,
      pageContributors,
      owner: owners,
      subtitle,
      title
    } = params

    const classes = ['quire-page__header', 'hero']

    if (title == 'title page' || title == 'half title page') {
      classes.push('is-screen-only')
    }

    const pageLabel = label
      ? `<span class="label">${label}<span class="visually-hidden">${labelDivider}</span></span>`
      : ''

    const imageElement = image
      ? html`
          <section
            class="${classes} hero__image"
           style="background-image: url('${path.join(imageDir, image)}');"
          >
          </section>
        `
      : ''

    const contributorsElement = pageContributors
      ? html`
          <div class="quire-page__header__contributor">
            ${contributors({ context: pageContributors, format: bylineFormat })}
          </div>
        `
      : ''

    let ownersElement
    if (owners) {
      let ownersList = []
      for (const owner of owners) {
        
        const name = owner.full_name 
          ? owner.full_name 
          : owner.first_name + ' ' + owner.last_name
  
        const years = owner.years 
          ? owner.years
          : ''
  
        ownersList.push(html`<li>${name} (${years})</li>`) 
      }
      ownersElement = html`<ul class="quire-page__header__owner">${ownersList}</ul>`
    }
    
    return html`
      <section class="${classes}">
        <div class="hero-body">
          <h1 class="quire-page__header__title" id="${slugify(title)}">
            ${pageLabel}
            ${pageTitle({ title, subtitle })}
          </h1>
          ${ownersElement}
          ${contributorsElement}
        </div>
      </section>
      ${imageElement}
    `
  }
}
