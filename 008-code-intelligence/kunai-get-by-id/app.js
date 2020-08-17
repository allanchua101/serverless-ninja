const { getKunaiByID } = require("./modules/get-kunai-by-id");

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

    try {
      let id = event["queryStringParameters"]["id"];

      if (typeof id === "undefined" || !id) {
        return respond(422, { issue: "ID is required" });
      }

      let item = await getKunaiByID(id);

      if (item === null) {
        return respond(404);
      }

      return respond(200, { item });
    } catch (err) {
      // TODO: Add logging code here
      return respond(500, { issue: "Internal server error" });
    }
  },
};
