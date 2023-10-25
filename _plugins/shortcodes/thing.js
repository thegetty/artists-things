//
// CUSTOMIZED FILE
// based on cite.js, creates a pop-up with full data and links for a given "thing"
//
const chalkFactory = require('~lib/chalk')
const { html, renderOneLine } = require('~lib/common-tags')
const { warn } = chalkFactory('shortcodes:thing')

/**
 * Shortcode to display pop-up vocab definitions with links to full vocab page
 *
 * @param      {String}   thing     Matching a thing page
 * @param      {String}   display   An optional override for inline display
 * @return     {boolean}  An HTML <span> element copying the citation pop-up
 */
module.exports = function (eleventyConfig, { collections, page }) {
  const icon = eleventyConfig.getFilter('icon')
  const markdownify = eleventyConfig.getFilter('markdownify')

  return function (thing, display) {
    const displayText = display ? display : thing
      const thingPage = collections.thing
      .find( collectionPage => collectionPage.data.title
        .toLowerCase()
        .concat(',')
        .concat(collectionPage.data.aliases)
        .split(',')
        .includes(thing.toLowerCase())
      )

    if ( !thingPage ) {
      warn(`Page not found for '${thing}' on ${page.inputPath}`)
      return renderOneLine`<span style="color:red;">${displayText}</span>`
    }

    const linkIcon = `${icon({ type: 'right-arrow', description: 'View' })}`

    let owners = []
    if (thingPage.data.object[0].owner) {
      for (const owner of thingPage.data.object[0].owner) {
        
        const name = owner.full_name 
          ? owner.full_name 
          : owner.first_name + ' ' + owner.last_name
  
        const years = owner.years 
          ? owner.years
          : ''
  
        owners.push(`<span role="listitem">${name} (${years})</span>`) 
      }
    }

    let types = ''
    if (thingPage.data.object[0].type) {
      for (type of thingPage.data.object[0].type) {
        let urlQuery = type.replaceAll(" ", "%2520")
          .replaceAll("|", "%257C")
          .replaceAll("/", "%252F")
        newType = html`<span role="listitem"><a href="/things/?type=${urlQuery}" class="quire-thing__link"><span>${type}</span><span>${linkIcon}</span></a></span>`
        types = types + newType
      }
    }

    let themes = ''
    if (thingPage.data.object[0].theme) {
    for (theme of thingPage.data.object[0].theme) {
        let urlQuery = theme.replaceAll(" ", "%2520")
          .replaceAll("|", "%257C")
          .replaceAll("/", "%252F")
        newTheme = html`<span role="listitem"><a href="/things/?theme=${urlQuery}" class="quire-thing__link"><span>${theme}</span><span>${linkIcon}</span></a></span>`
        themes = themes + newTheme
      }
    }

    let materials = ''
    if (thingPage.data.object[0].material) {
      for (material of thingPage.data.object[0].material) {
        const materialWithoutCategory = material.replace(/.*? \| /g, '')
        let urlQuery = material.replaceAll(" ", "%2520")
          .replaceAll("|", "%257C")
          .replaceAll("/", "%252F")
        newMaterial = html`<span role="listitem"><a href="/things/?material=${urlQuery}" class="quire-thing__link"><span>${materialWithoutCategory}</span><span>${linkIcon}</span></a></span>`
        materials = materials + newMaterial
      }
    }

    let mentions = ''
    const aliases = thingPage.data.aliases.concat(thingPage.data.title.toLowerCase())
    for (entry of collections.thing) {
      if (entry.data.mentions) {
        const matches = entry.data.mentions.filter(element => aliases.includes(element))
        if ( matches.length >= 1 ) {
          newMention = html`<span role="listitem"><a href="${entry.url}" class="quire-thing__link"><span>${markdownify(entry.data.title)}</span><span>${linkIcon}</span></a></span>`
          mentions = mentions + newMention
        }
      }
    }

    return renderOneLine`
      <span class="quire-citation quire-thing expandable">
        <span class="quire-citation__button quire-thing__button" role="button" tabindex="0" aria-expanded="false">
          ${markdownify(displayText)}
        </span>
        <span hidden class="quire-citation__content quire-thing__content">
          
          <span class="quire-thing__main">
            <a href="${thingPage.url}">
              <span class="quire-thing__main__title">${markdownify(thingPage.data.title)}</span>
              <span class="quire-thing__main__icon">${linkIcon}</span>
              <span class="quire-thing__main__owner" role="list">
                ${owners.join('')}
              </span>
            </a>
          </span>

          <span class="quire-thing__type">
            <span class="quire-thing__heading">Type of Object</span>
            <span role="list">
              ${types}
            </span>
          </span>

          <span class="quire-thing__theme">
            <span class="quire-thing__heading">Theme</span>
            <span role="list">
              ${themes}
            </span>
          </span>

          <span class="quire-thing__material">
            <span class="quire-thing__heading">Material</span>
            <span role="list">
              ${materials}
            </span>
          </span>

          <span class="quire-thing__mentions">
            <span class="quire-thing__heading-alt">Also mentioned in:</span>
            <span role="list">
              ${mentions}
            </span>
          </span>

        </span>
      </span>`
  }
}