const { getNinjas } = require("./modules/ninja-query");

let formResponse = (statusCode, body) => {
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
      return formResponse(200, {});
    }

    let statusCode = 200;
    let items = [];

    try {
      items = await getNinjas();
    } catch (err) {
      statusCode = 500;

      // TODO: Add logging code here
    }

    return formResponse(statusCode, { items });
  },
};
