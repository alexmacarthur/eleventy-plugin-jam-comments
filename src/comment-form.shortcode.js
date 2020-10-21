require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");

const CommentFetcher = require("./CommentFetcher");
const fetcher = new CommentFetcher();
const env = nunjucks.configure(path.join(__dirname, "views"));

/**
 * Get compiled SCSS file contents from directory.
 */
const getAsset = (asset) => {
  try {
    return fs.readFileSync(
      `${path.join(__dirname, `assets/dist/index.${asset}`)}`,
      "utf8"
    );
  } catch (e) {
    return "";
  }
};

const commentForm = async function () {

  console.log("IN FORMzzsddfffpppppp");
  const {
    data: { comments },
    errors,
  } = await fetcher.getComments();
  const css = getAsset("css");
  const js = getAsset("js");

  if (errors) {
    throw "Something went wrong while query for comments.";
  }

  return env.render("index.njk", { comments, css, js });
};

module.exports = commentForm;
