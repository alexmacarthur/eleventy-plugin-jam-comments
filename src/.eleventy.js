const pluginSass = require("eleventy-plugin-sass");
const commentForm = require('./comment-form.shortcode');

module.exports = function(eleventyConfig, options) {
  options = options || {};

  eleventyConfig.addNunjucksAsyncShortcode("jamcomments", async function(url = null) {
    return await commentForm(options, url);
  });
};
