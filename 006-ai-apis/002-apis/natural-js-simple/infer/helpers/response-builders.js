module.exports = {
  /**
   * @function buildResponse
   * @description Method used for formatting the response object.
   * @param {number} statusCode HTTP status code
   * @param {object} body Response payload
   * @returns {object} Structured lambda response
   */
  buildResponse(statusCode, body) {
    return {
      statusCode: statusCode,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,x-api-key",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
      },
    };
  },
};
