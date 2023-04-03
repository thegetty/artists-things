//
// CUSTOMIZED FILE
// Added three dropdown selects for the thing grid
//
const path = require('path')
const { html } = require('~lib/common-tags')
/**
 * Renders a TOC List
 *
 * @param     {Object} eleventyConfig
 * @param     {Object} params
 * @property  {Object} collection An eleventy collection, such as `collection.tableOfContentsEpub`
 * @property  {Object} page The current page object
 * @property  {String} presentation How the TOC should display. Possible values: ['abstract', 'brief', 'grid']
 *
 * @return {String} TOC list
 */
module.exports = function(eleventyConfig) {
  const eleventyNavigation = eleventyConfig.getFilter('eleventyNavigation')
  const tableOfContentsItem = eleventyConfig.getFilter('tableOfContentsItem')

  return function(params) {
    const { collection, currentPageUrl, key, presentation, thingPages } = params

    const sectionNavigation = eleventyNavigation(collection, key)
    const navigation = sectionNavigation.length
      ? sectionNavigation
      : eleventyNavigation(collection)

    const filterCurrentPage = (pages) => {
      return pages.filter((page) => {
        return page && page.url !== currentPageUrl
      })
    }

    const listItem = (page) => {
      if (presentation !== 'brief' && page.children && page.children.length) {
        const children = renderList(page.children)
        return `${tableOfContentsItem({ children, page, presentation })}`
      }
      return `${tableOfContentsItem({ page, presentation })}`
    }

    // selectMenu()

    let types = []
    for (entry of collection) {
      if (entry.data.type) {
        types = types.concat(entry.data.type)
      }
    }
    const uniqueTypes = Array.from(new Set(types)).sort();
    let typeSelections = ''
    for (type of uniqueTypes) {
      typeSelections += html`<option value="${type}">${type}</option>`
    }
    const typeMenu = html`<div class="table-of-contents-select">
            <label for="types">Type:</label>
            <select name="types" id="types">
              <option value="all-types">All</option>
              ${typeSelections}
            </select>
            </div>`


    let themes = []
    for (entry of collection) {
      if (entry.data.theme) {
        themes = themes.concat(entry.data.theme)
      }
    }
    const uniqueThemes = Array.from(new Set(themes)).sort();
    let themeSelections = ''
    for (theme of uniqueThemes) {
      themeSelections += html`<option value="${theme}">${theme}</option>`
    }
    const themeMenu = html`<div class="table-of-contents-select">
            <label for="theme">Theme:</label>
            <select name="themes" id="themes">
              <option value="all-themes">All</option>
              ${themeSelections}
            </select>
            </div>`


    let materials = []
    for (entry of collection) {
      if (entry.data.material) {
        materials = materials.concat(entry.data.material)
      }
    }
    const uniqueMaterials = Array.from(new Set(materials)).sort();
    let materialSelections = ''
    for (material of uniqueMaterials) {
      materialSelections += html`<option value="${material}">${material}</option>`
    }
    const materialMenu = html`<div class="table-of-contents-select">
            <label for="materials">Material:</label>
            <select name="materials" id="materials">
              <option value="all-materials">All</option>
              ${materialSelections}
            </select>
            </div>`

    const renderList = (pages) => {
      const otherPages = filterCurrentPage(pages)
      return html`
        <ol class="table-of-contents-list">
          ${otherPages.map(listItem)}
        </ol>
      `
    }

    return html`
      <div class="table-of-contents-select-group" id="select-group">
        ${typeMenu}
        ${themeMenu}
        ${materialMenu}
      </div>
      <nav class="table-of-contents menu-list">
        ${renderList(navigation)}
      </nav>
    `
  }
}
