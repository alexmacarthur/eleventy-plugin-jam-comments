const commentForm = require('./comment-form.shortcode.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('jamComments', commentForm);
};
