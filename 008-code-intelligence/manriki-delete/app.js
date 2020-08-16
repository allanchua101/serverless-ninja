const moment = require("moment");
const { deleteManrikiByID } = require("./modules/delete-manriki-by-id");

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
      let id = event["queryStringParameters"]["id"];

      if (typeof id === "undefined" || !id) {
        return respond(422, { issue: "ID is required" });
      }

      await deleteManrikiByID(id);

      let response = {
        id,
        isDeleted: true,
        deletedOn: moment().unix(),
      };

      return respond(200, response);
    } catch (err) {
      // TODO: Add logging code here
      return respond(500, { items });
    }
  },
};
