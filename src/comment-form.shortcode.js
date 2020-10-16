const path = require("path");
const nunjucks = require("nunjucks");

nunjucks.configure(path.join(__dirname, 'views'));

module.exports = (id) => {
  console.log('hihey');
  return nunjucks.render('index.njk');
};
