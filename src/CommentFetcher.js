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
  }
`;

class CommentFetcher {
  constructor({ domain, apiKey }) {
    this.domain = domain;
    this.client = QuestClient({
      endpoint: "http://localhost:4000/graphql",
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });
  }

  async getComments() {
    return await this.client.send(COMMENTS_QUERY, {
      domain: this.domain,
      status: "approved",
    });
  }
}

module.exports = CommentFetcher;
