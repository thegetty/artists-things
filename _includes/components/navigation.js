//
// CUSTOMIZED FILE
// show current page title instead of homepage link, lines 76–85
// and use icons.js filter in place of hard-coded SVG icons
// add center contents page link to Thing pages
//
const truncate = require('~lib/truncate')
const { html } = require('~lib/common-tags')

/**
 * This controls the various navigation elements (nav, skip-link, menu and
 * search icons, and search results if enabled). It is visible on all pages.
 *
 * A note that while Hugo includes .Next and .Prev variables that can be used
 * to connect to the next and previous pages in the linear order of the site,
 * Quire makes available the option of hiding pages from the linear order in the
 * book in order to have custom pages in other formats (PDF, EPUB, etc.).
 * Because of this, the .Next and .Prev variables are not used here, and instead
 * eligible pages are ranged through and based on weight, the next or previous
 * one in the range is linked to.
 */
module.exports = function(eleventyConfig) {
  const eleventyNavigation = eleventyConfig.getFilter('eleventyNavigation')
  const icon = eleventyConfig.getFilter('icon')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const { imageDir } = eleventyConfig.globalData.config.figures

  return function (params) {
    const { collections, pagination, title } = params
    const {
      currentPage,
      currentPageIndex,
      nextPage,
      percentProgress,
      previousPage
    } = pagination

    if (!currentPage) return
    
    const home = '/'
    const isHomePage = currentPage.url === home

    const navBarLabel = ({ label, short_title, title }) => {
      return pageTitle({ label, title: short_title || truncate(title, 34)})
    }

    const navBarStartButton = () => {
      if (!isHomePage) return ''
      const secondPageLink = collections.navigation[1].url
      return `
        <li class="quire-navbar-page-controls__item quire-home-page">
          <a href="${secondPageLink}" rel="next">
            <span class="visually-hidden">Next Page: </span>
            <span class="quire-navbar-button play-button">
              ${icon({ type: 'start', description: 'Next page'})}
            </span>
          </a>
        </li>
      `
    }

    const navBarPreviousButton = () => {
      if (!previousPage) return ''
      const { data, url } = previousPage
      const { label, short_title, title } = data
      return html`
        <li class="quire-navbar-page-controls__item quire-previous-page">
          <a href="${url}" rel="previous">
            <span class="visually-hidden">Previous Page: </span>
            ${icon({ type: 'left-arrow', description: 'Previous page'})}
            ${navBarLabel({ label, short_title, title })}
          </a>
        </li>
      `
    }

    const navBarHomeButton = () => {
      if (!previousPage) return ''
      const { data } = currentPage
      const { label, short_title, title, tags } = data
      const thingsLink = (tags == 'thing') 
        ? `<a href="/contents/" class="things-grid-link">Things:</a>`
        : ''
      return html`
        <li class="quire-navbar-page-controls__item quire-home-page">
          ${thingsLink} <span class="things-page-title">${navBarLabel({ label, short_title, title })}</span>
        </li>
      `
    }

    const navBarNextButton = () => {
      if (isHomePage || !nextPage) return ''
      const { data, url } = nextPage
      const { label, short_title, title } = data
      return html`
        <li class="quire-navbar-page-controls__item quire-next-page">
          <a href="${url}" rel='next'>
            <span class="visually-hidden">Next Page: </span>
            ${navBarLabel({ label, short_title, title })}
            ${icon({ type: 'right-arrow', description: 'Next page'})}
          </a>
        </li>
      `
    }

    return html`
      <div class="quire-navbar">
        <a href="#main" class="quire-navbar-skip-link" tabindex="1">
          Skip to Main Content
        </a>
        <nav class="quire-navbar-controls">
          <div class="quire-navbar-controls__left">
            <button
              class="quire-navbar-button search-button"
              aria-controls="quire-search"
              onclick="toggleSearch()"
            >
              ${icon({ type: 'search', description: 'Previous page'})}
              <span class="visually-hidden">Search</span>
            </button>
          </div>
          <div class="quire-navbar-controls__center">
            <ul class="quire-navbar-page-controls" role="navigation" aria-label="quick">
              ${navBarStartButton()}
              ${navBarPreviousButton()}
              ${navBarHomeButton()}
              ${navBarNextButton()}
            </ul>
          </div>
          <div class="quire-navbar-controls__right">
            <button
              class="quire-navbar-button menu-button"
              id="quire-controls-menu-button"
              onclick="toggleMenu()"
              aria-expanded="true"
              aria-controls="quire-menu"
              tabindex="2"
            >
              ${icon({ type: 'nav', description: 'Navigation menu'})}
              <span class="visually-hidden">Table of Contents</span>
            </button>
          </div>
        </nav>
        <div class="quire-progress-bar">
          <div style="width: ${percentProgress}%;">
            <span>${currentPageIndex + 1}/${collections.navigation.length}</span>
          </div>
        </div>
      </div>
    `
  }
}
