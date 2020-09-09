const { buildResponse } = require("./helpers/response-builders");
const { loadFrozenModel } = require("./helpers/model-loader");
const MODEL_PATH = "./weights/hate-speech-classifier.json";
let model = null;

module.exports = {
  async execute(event, context) {
    try {
      // if request is CORS-related, quickly respond
      if (event.httpMethod.toLowerCase() === "options") {
        return buildResponse(200, {});
      }

      // if request body is not found,
      // respond with un-processable entity (422)
      if (!event.body) {
        return buildResponse(422, { issue: "Request payload is missing" });
      }

      // Parse JSON body
      let input = JSON.parse(event.body);

      // If text to classify is not provided,
      // respond with un-processable entity (422)
      if (!input.text) {
        return buildResponse(422, { issue: "Please provide an input text" });
      }

      // If request is valid, processable, and
      // the lambda invocation is a cold start
      if (model === null) {
        // load frozen model from disk.
        model = await loadFrozenModel(MODEL_PATH);
      }

      // Run classification on input text.
      let category = model.classify(input.text);

      // Respond with 200 status code
      // and include model-inferred category
      return buildResponse(200, { category });
    } catch (err) {
      console.log(err.message);
      // Gracefully handle internal server issues
      // and respond with 500 status code
      return buildResponse(500, { issue: "Internal server error" });
    }
  },
};
