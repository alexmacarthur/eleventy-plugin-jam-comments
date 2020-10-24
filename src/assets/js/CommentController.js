import { QuestClient } from "graphql-quest";
import { formatFormValues, getCurrentTime, toPrettyDate } from "./utils";
import { CREATE_COMMENT_QUERY } from "./queries";

export default function CommentController(shell) {
  const minimumSubmissionTime = 1000;
  const loadingSvg = shell.querySelector(".jc-CommentBox-loadingDots");
  const commentList = shell.querySelector(
    '[data-jam-comments-component="list"]'
  );
  const message = shell.querySelector(
    '[data-jam-comments-component="message"]'
  );
  const client = new QuestClient({
    endpoint: "http://localhost:4000/graphql",
    headers: {
      "x-api-key": "JAM_COMMENTS_API_KEY",
    },
  });

  /**
   * When textarea is focused upon, show all inputs.
   *
   * @return {void}
   */
  const listenForTextareaFocus = () => {
    shell.querySelector('[name="content"]').addEventListener("focus", (e) => {
      [...shell.querySelectorAll(".jc-CommentBox-contactInput")].forEach(
        (i) => {
          i.style.display = "flex";
        }
      );
    });
  };

  /**
   * When form is submitted, send to service & respond accordingly.
   *
   * @return {void}
   */
  const listenForSubmission = () => {
    shell.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();

      const startTime = getCurrentTime();
      const { content, name, emailAddress } = formatFormValues(
        e.target.elements
      );

      console.log(shell.dataset.jamCommentsUrl);

      const variables = {
        name,
        domain: "JAM_COMMENTS_DOMAIN",
        content,
        emailAddress,
        path: shell.dataset.jamCommentsUrl || window.location.pathname,
      };

      // Show the loading dots.
      loadingSvg.style.display = "";

      client.send(CREATE_COMMENT_QUERY, variables).then((result) => {
        const remaining =
          minimumSubmissionTime - (getCurrentTime() - startTime);
        const delay = remaining > 0 ? remaining : 0;

        if (result.errors || !result.data) {
          hideLoadingSvg();
          return showError();
        }

        setTimeout(() => {
          hideLoadingSvg();
          appendComment(result.data.createComment);
        }, delay);
      });
    });
  };

  /**
   * Hide the loading SVG.
   *
   * @return {void}
   */
  const hideLoadingSvg = () => {
    loadingSvg.style.display = "none";
  };

  /**
   * Display a generic error message.
   *
   * @return {void}
   */
  const showError = () => {
    message.style.display = "";
    message.firstElementChild.innerText =
      "Oh no! Something went wrong while trying to submit that comment.";
  };

  /**
   * Clone list item and attach to list of comments with latest comment data.
   *
   * @return {void}
   */
  const appendComment = (commentData) => {
    const contentKeysToReplace = ["content", "createdAt", "name"];

    commentData.createdAt = toPrettyDate(commentData.createdAt);

    const { id } = commentData;
    const clonedItem = commentList.querySelector("li").cloneNode(true);

    // Set the text content for each element piece.
    contentKeysToReplace.forEach((property) => {
      const node = clonedItem.querySelector(
        `[data-jam-comments-component="${property}"]`
      );
      node.innerText = commentData[property];
    });

    clonedItem.querySelectorAll(
      '[data-jam-comments-component="anchor"]'
    ).href = `#comment-${id}`;

    commentList.insertBefore(clonedItem, commentList.firstChild);
  };

  listenForSubmission();
  listenForTextareaFocus();
}
