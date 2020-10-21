const { QuestClient } = require("graphql-quest");

const COMMENTS_QUERY = `
query Comments($domain: String!, $status: String){
  comments(domain: $domain, status: $status) {
    createdAt
    name
    emailAddress
    content
    path
    id
  }
}`;

class CommentFetcher {
  constructor() {
    this.domain = "macarthur.me";
    this.client = QuestClient({
      endpoint: "http://localhost:4000/graphql",
      method: "GET",
      headers: {
        "x-api-key": "AGMP1TM-ZKC4XWX-J13XW4P-4NNS4R2",
      },
    });
  }

  async getComments() {
    return this.client.send(COMMENTS_QUERY, {
      domain: this.domain,
      status: "approved",
    });
  }
}

module.exports = CommentFetcher;
