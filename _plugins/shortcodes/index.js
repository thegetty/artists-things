//
// CUSTOMIZED FILE
// added abbr shortcode, lines 7 and 23
// added thing shortcode, lines 17 and 34
//
const accordion = require('./accordion.js')
const addComponentTag = require('../../_plugins/components/addComponentTag')
const abbr = require('./abbr')
const backmatter = require('./backmatter')
const bibliography = require('./bibliography')
const cite = require('./cite')
const contributors = require('./contributors')
const figure = require('./figure')
const figureGroup = require('./figureGroup')
const open = require('./open')
const ref = require('./ref')
const shortcodeFactory = require('../components/shortcodeFactory')
const thing = require('./thing')
const title = require('./title')
const tombstone = require('./tombstone')

module.exports = function(eleventyConfig, collections, options) {
  const addShortcode = shortcodeFactory(eleventyConfig, collections)
  addShortcode('abbr', abbr)
  addComponentTag(eleventyConfig, 'annoref', annoref)
  eleventyConfig.addPairedShortcode('backmatter', function(content, ...args) {
    return backmatter(eleventyConfig)(content, ...args)
  })
  addShortcode('bibliography', bibliography)
  addShortcode('cite', cite)
  addComponentTag(eleventyConfig, 'contributors', contributors)
  addShortcode('figure', figure)
  addShortcode('figuregroup', figureGroup)
  addShortcode('ref', ref)
  addShortcode('thing', thing)
  addShortcode('title', title)
  addShortcode('tombstone', tombstone)
}
module.exports = function(eleventyConfig, collections, options) {
  const { addShortcode, addPairedShortcode } = shortcodeFactory(eleventyConfig, collections)

  addShortcode('abbr', abbr)
  addPairedShortcode('accordion', accordion)
  addComponentTag(eleventyConfig, 'ref', ref)
  addPairedShortcode('backmatter', backmatter)
  addShortcode('bibliography', bibliography)
  addShortcode('cite', cite)
  addComponentTag(eleventyConfig, 'contributors', contributors)
  addShortcode('figure', figure)
  addShortcode('figuregroup', figureGroup)
  addShortcode('open', open)
  addShortcode('thing', thing)
  addShortcode('title', title)
  addShortcode('tombstone', tombstone)
}
