/**
 * Renders <head> <meta> data tags for Open Graph protocol data
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  data
 * 
 * @return     {String}  HTML meta and link elements
 */
module.exports = function(eleventyConfig) {
  const { config, publication } = eleventyConfig.globalData

  return function ({ page }) {
    const { description, identifier, promo_image, pub_date, pub_type, title, url } = publication
    const pageType = page && page.layout

    let socialThumbnail
    let socialTitle 
    let socialDescription
    if (page.layout == 'thing') {
      socialThumbnail = url.concat('_assets/images/', page.object[0].thumbnail)
      socialTitle = page.title.concat(' (from ', title, ')')
      socialDescription = page.abstract || description.full
    } else {
      socialThumbnail = url.concat('_assets/images/', promo_image)
      socialTitle = title
      socialDescription = description.one_line || description.full
    }
    const meta = [
      {
        property: 'og:title',
        content: socialTitle
      },
      {
        property: 'og:url',
        content: page.canonicalURL
      },
      {
        property: 'og:image',
        content: socialThumbnail
      },
      {
        property: 'og:description',
        content: socialDescription
      }
    ]

    if (pageType != 'essay' && pub_type === 'book') {
      meta.push({ property: 'og:type', content: 'book' })
      meta.push({
        property: 'og:book:isbn', content: identifier.isbn && identifier.isbn.replace(/-/g, '')
      })
      meta.push({ property: 'og:book:release_date', content: pub_date })
    } else {
      meta.push({ property: 'og:type', content: 'article' })
      meta.push({ property: 'og:site_name', content: publication.title })
      meta.push({ property: 'og:article:published_time', content: pub_date })
    }

    publication.contributor.forEach((contributor) => {
      const { type, full_name, first_name, last_name } = contributor
      const name = full_name || `${first_name} ${last_name}`
      switch (type) {
        case 'primary':
          meta.push({ property: 'og:book:author', content: name })
          break
        default:
          break
      }
    })

    const metaTags = meta.map(({ property, content }) => (
      `<meta property="${property}" content="${content}">`
    ))
    return `${metaTags.join('\n')}`
  }
}
