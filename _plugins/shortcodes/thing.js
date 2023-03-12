//
// CUSTOMIZED FILE
// based on cite.js, creates a pop-up with full data and links for a given "thing"
//
const chalkFactory = require('~lib/chalk')
const { html, renderOneLine } = require('~lib/common-tags')
const { warn } = chalkFactory('shortcodes:def')

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

    // strip def and cite shortcodes and show display value only
    // const regex = /\{% [a-z]+ (\"([^\"]*?)\" ){1,3}%\}/g
    // const plainDefinition = thingPage.data.definition.replace(regex, '$2')

    // truncate definition but not mid-word
    // const maxLength = 240
    // let displayDefinition = ''
    // if (plainDefinition.length < maxLength){
    //   displayDefinition = plainDefinition
    // } else {
    //   displayDefinition = plainDefinition.substring(0, maxLength)
    //   displayDefinition = displayDefinition
    //     .substring(0, Math.min(
    //       displayDefinition.length,
    //       displayDefinition.lastIndexOf(' ')))
    //     .concat(' ...')
    // }

    // const type = thingPage.data.type
    // const theme = thingPage.data.theme
    // const material = thingPage.data.material

    const linkIcon = `${icon({ type: 'right-arrow', description: 'View' })}`

    let owners = []
    if (thingPage.data.owner) {
      for (const owner of thingPage.data.owner) {
        
        const name = owner.full_name 
          ? owner.full_name 
          : owner.first_name + ' ' + owner.last_name
  
        const years = owner.years 
          ? owner.years
          : ''
  
        owners.push(`<span role="listitem">${name} ${years}</span>`) 
      }
    }

    let types = ''
    if (thingPage.data.type) {
      for (type of thingPage.data.type) {
        newType = html`<span role="listitem"><a href="/contents/" class="quire-thing__link"><span>${type}</span><span>${linkIcon}</span></a></span>`
        types = types + newType
      }
    }

    let themes = ''
    if (thingPage.data.theme) {
    for (theme of thingPage.data.theme) {
        newTheme = html`<span role="listitem"><a href="/contents/" class="quire-thing__link"><span>${theme}</span><span>${linkIcon}</span></a></span>`
        themes = themes + newTheme
      }
    }

    let materials = ''
    if (thingPage.data.material) {
      for (material of thingPage.data.material) {
        newMaterial = html`<span role="listitem"><a href="/contents/" class="quire-thing__link"><span>${material}</span><span>${linkIcon}</span></a></span>`
        materials = materials + newMaterial
      }
    }

    return renderOneLine`
      <span class="quire-citation quire-thing expandable">
        <span class="quire-citation__button quire-thing__button" role="button" tabindex="0" aria-expanded="false">
          ${displayText}
        </span>
        <span hidden class="quire-citation__content quire-thing__content">
          
          <span class="quire-thing__main">
            <a href="${thingPage.url}">
              <span class="quire-thing__main__title">${thingPage.data.title}</span>
              <span class="quire-thing__main__icon">${linkIcon}</span>
              <span class="quire-thing__main__owner" role="list">
                ${owners}
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

        </span>
      </span>`
  }
}