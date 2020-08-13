const { getNinjas } = require("./modules/ninja-query");

let respond = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,x-api-key",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
    },
  };
};

module.exports = {
  async execute(event, context) {
    if (event.httpMethod.toLowerCase() === "options") {
      return respond(200, {});
    }

    let items = [];

    try {
      items = await getNinjas();

      return respond(200, { items });
    } catch (err) {
      // TODO: Add logging code here
      return respond(500, { issue: "Internal server error" });
    }
  },
};
