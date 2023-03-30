//
// CUSTOMIZED FILE
// Handle a page redirect
//
/**
 * Renders a menu item
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  params
 * @property      {Object}  data Page data
 * @property      {String}  title Page title
 * @property      {String}  url Page url
 */
module.exports = function(eleventyConfig) {
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const urlFilter = eleventyConfig.getFilter('url')

  return function(params) {
    const { currentURL, page } = params
    const { data, url } = page
    const { label, layout, redirect, title } = data

    const titleText = pageTitle({ label, title })
    const targetURL = redirect ? redirect : url
    /**
     * Check if item is a reference to a built page or just a heading
     * @type {Boolean}
     */
    const isPage = !!layout
    return isPage
      ? `<a href="${urlFilter(targetURL)}" class="${currentURL === targetURL ? 'active' : ''}">${titleText}</a>`
      : titleText
  }
}
