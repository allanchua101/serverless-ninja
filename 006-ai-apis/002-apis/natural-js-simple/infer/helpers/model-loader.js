const natural = require("natural");
const MODEL_PATH = "../weights/hate-speech-classifier.json";

module.exports = {
  /**
   * @function loadFrozenModel
   * @description Method used for loading our frozen classifier
   * @returns {Promise<natural.BayesClassifier>} Instance of text classifier
   */
  loadFrozenModel() {
    return new Promise((resolve, reject) => {
      natural.BayesClassifier.load(MODEL_PATH, null, (err, classifier) => {
        if (err) {
          reject(err);
        }

        resolve(classifier);
      });
    });
  },
};
