const { getNinjas } = require("./modules/ninja-query");
const { buildResponse } = require(process.env.AWS
  ? "/opt/nodejs/response-builder"
  : "../base-layer/nodejs/response-builder");
const { sendAlert } = require(process.env.AWS
  ? "/opt/nodejs/slack-alarm"
  : "../base-layer/nodejs/slack-alarm");

module.exports = {
  async execute(event, context) {
    if (event.httpMethod && event.httpMethod.toLowerCase() === "options") {
      return buildResponse(200, {});
    }

    try {
      let items = await getNinjas();

      return buildResponse(200, { items });
    } catch (err) {
      await sendAlert(err);

      return buildResponse(500, { issue: "Internal server error" });
    }
  },
};
