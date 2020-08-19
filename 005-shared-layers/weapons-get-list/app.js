const { getWeapons } = require("./modules/weapons-query");
const { buildResponse } = require(process.env.AWS
  ? "/opt/nodejs/response-builder"
  : "../base-layer/nodejs/response-builder");

module.exports = {
  async execute(event, context) {
    if (event.httpMethod && event.httpMethod.toLowerCase() === "options") {
      return buildResponse(200, {});
    }

    try {
      let items = await getWeapons();

      return buildResponse(200, { items });
    } catch (err) {
      return buildResponse(500, { issue: "Internal server error" });
    }
  },
};
