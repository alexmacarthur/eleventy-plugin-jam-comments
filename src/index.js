const pluginSass = require("eleventy-plugin-sass");
const commentForm = require('./comment-form.shortcode');

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./')

  eleventyConfig.addNunjucksAsyncShortcode("jamcomments", async function() {
    return await commentForm();
  });
};
