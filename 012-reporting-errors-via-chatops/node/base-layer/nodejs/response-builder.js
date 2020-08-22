const moment = require("moment");

module.exports = {
  /**
   * @function buildResponse
   * @description Method used for building response payloads.
   * @param {number} statusCode Status code of response.
   * @param {object} body Response body.
   * @returns {object} Standardized response payload.
   */
  buildResponse(statusCode, body = {}) {
    body.stamp = moment().unix();

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
  },
};
