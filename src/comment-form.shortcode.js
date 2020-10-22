require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");
const { toIsoString, toPrettyDate, getCompiledAsset, getFileContents } = require("./utils");

const CommentFetcher = require("./CommentFetcher");
const env = nunjucks.configure(path.join(__dirname, "views"));

/**
 * Replace each placeholder with the respective environment variable.
 *
 * @param {string} js
 * @param {string} domain
 * @param {string} apiKey
 * @return {string}
 */
const setEnvironmentVariables = (js, domain, apiKey) => {
  return js
    .replace(/JAM_COMMENTS_DOMAIN/, domain)
    .replace(/JAM_COMMENTS_API_KEY/, apiKey);
};

/**
 * Render the comment form.
 *
 * @param {object} options
 */
const commentForm = async function (options, url) {
  const fetcher = new CommentFetcher(options);
  const {
    data: { comments },
    errors,
  } = await fetcher.getComments();
  const { domain, apiKey } = options;
  const loadingSvg = getFileContents(`assets/img/loading.svg`);
  const css = getCompiledAsset("css");
  const js = setEnvironmentVariables(getCompiledAsset("js"), domain, apiKey);

  if (errors) {
    throw "Something went wrong while query for comments.";
  }

  env.addFilter('iso', (time) => {
    return toIsoString(time);
  });

  env.addFilter('prettyDate', time => {
    return toPrettyDate(time);
  });

  return env.render("index.njk", {
    comments,
    css,
    js,
    loadingSvg,
    domain,
    apiKey,
    url
  });
};

module.exports = commentForm;
