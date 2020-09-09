const natural = require("natural");
const naiveBayes = natural.BayesClassifier;

module.exports = {
  /**
   * @function loadFrozenModel
   * @description Method used for loading our frozen classifier
   * @params {string} modelPath Path of model weights
   * @returns {Promise<natural.BayesClassifier>} Instance of text classifier
   */
  loadFrozenModel(modelPath) {
    return new Promise((resolve, reject) => {
      naiveBayes.load(modelPath, null, (err, classifier) => {
        if (err) {
          reject(err);
        }

        resolve(classifier);
      });
    });
  },
};
