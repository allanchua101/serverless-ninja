const natural = require("natural");
const naiveBayes = natural.BayesClassifier;
const MODEL_PATH = "./weights/hate-speech-classifier.json";

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

let loadFrozenModel = () => {
  return new Promise((resolve, reject) => {
    naiveBayes.load(MODEL_PATH, null, (err, classifier) => {
      if (err) {
        reject(err);
      }

      resolve(classifier);
    });
  });
};

module.exports = {
  async execute(event, context) {
    try {
      if (event.httpMethod.toLowerCase() === "options") {
        return respond(200, {});
      }

      if (!event.body) {
        return respond(422, { issue: "Request payload is missing" });
      }
      let input = JSON.parse(event.body);

      if (!input.text) {
        return respond(422, { issue: "Please provide an input text" });
      }

      let model = await loadFrozenModel(input.text);
      let category = model.classify(input.text);

      return respond(200, { category });
    } catch (err) {
      return respond(500, { issue: "Internal server error" });
    }
  },
};
