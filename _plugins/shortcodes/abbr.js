//
// CUSTOMIZED FILE
// New shortcode to wrap abbreviations in text
//
const chalkFactory = require('~lib/chalk')
const { html } = require('~lib/common-tags')
const logger = chalkFactory('shortcodes:abbr')
/**
 * Style wrapped `content` as "backmatter"
 *
 * @param      {String}  abbreviation  a reference abbreviation
 *
 * @return     {boolean}  A span elment with the abbreviation and its full value in the title attribute
 */
module.exports = function (eleventyConfig, { page }) {
  const { abbreviations_list: abbreviationsList } = eleventyConfig.globalData.abbreviations
  const markdownify = eleventyConfig.getFilter('markdownify')

  return function(abbreviation) {
    let abbrElement

    for ( const entry of abbreviationsList ) {
      if (entry.id == abbreviation) {
        abbrElement = html`<span class='abbreviation' title='${entry.full}'>${markdownify(abbreviation)}</span>`
      }
    }

    if (!abbrElement) {
      logger.error(`No match in abbbreviations.yaml for ${abbreviation} on ${page.inputPath}`)
      return html`<span style='color: red; font-weight: bold;'>${markdownify(abbreviation)}</span>`
    }

    return html`${abbrElement}`

  }
}
