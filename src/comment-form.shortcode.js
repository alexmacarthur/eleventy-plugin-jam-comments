const outdent = require("outdent")({ newline: " " });
const nunjucks = require("nunjucks");

nunjucks.configure('./eleventy-plugin-jam-comments/views/');

console.log("EHRE");
console.log(process.cwd());

module.exports = (id) => {

  return nunjucks.render('index');

  return outdent`
    <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/${id}"
            frameborder="0" allowfullscreen
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">

        </iframe>
    </div>`
};
