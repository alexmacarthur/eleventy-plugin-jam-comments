const commentForm = require('./comment-form.shortcode');

module.exports = function(eleventyConfig, options) {
  options = options || {};

  const renderCommentForm = async (url = null) => {
    return await commentForm(options, url);
  }

  eleventyConfig.addNunjucksAsyncShortcode("jamcomments", renderCommentForm);
  eleventyConfig.addLiquidShortcode("jamcomments", renderCommentForm);
  eleventyConfig.addJavaScriptFunction("jamcomments", renderCommentForm);
};
