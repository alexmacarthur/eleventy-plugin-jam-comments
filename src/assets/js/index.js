import "../scss/style.scss";
import { quest } from "graphql-quest";

const CREATE_COMMENT_QUERY = `
  mutation CreateComment(
    $name: String!,
    $path: String!,
    $content: String!,
    $domain: String!,
    $emailAddress: String
  ){
    createComment(
      name: $name,
      path: $path,
      content: $content,
      emailAddress: $emailAddress
      domain: $domain
    ) {
      createdAt
      name
      emailAddress
      content
      id
      site {
        domain
      }
    }
  }
`;

const formatFormValues = (htmlElementCollection) => {
  return [...htmlElementCollection].reduce((acc, item) => {
    if(!item.name) return acc;

    acc[item.name] = item.value;
    return acc;
  }, {});
}

function CommentController(shell) {

  shell.querySelector('[name="content"]').addEventListener('focus', (e) => {
    [...shell.querySelectorAll('.jc-CommentBox-contactInput')].forEach(i => {
      i.style.display = 'flex';
    });
  });

  shell.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const {content, name, emailAddress} = formatFormValues(e.target.elements);

    const variables = {
      name,
      domain: "CONFIG>COM",
      content,
      emailAddress,
      path: window.location.pathname
    }

    quest("http://localhost:4000/graphql", CREATE_COMMENT_QUERY, variables).then(response => {
      console.log(response);
    });
  });
}

const commentShells = [...document.querySelectorAll('[data-jam-comments]')];

commentShells.forEach(shell => CommentController(shell));


