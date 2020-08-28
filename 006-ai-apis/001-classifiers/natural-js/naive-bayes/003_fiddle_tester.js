const natural = require("natural");
const naiveBayes = natural.BayesClassifier;
const MODEL_PATH = "./hate-speech-classifier.json";

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

(async () => {
  try {
    let classifier = await loadFrozenModel();

    // Offensive Language
    console.log(classifier.classify("Are you stupid?"));
    console.log(classifier.classify("Are you crazy?"));
    console.log(classifier.classify("Do you know that bitch?"));

    // Hate Speech
    console.log(
      classifier.classify("like Snoop said in 94 we dont love these")
    );

    // Neither
    console.log(classifier.classify("Beautiful creature!"));
    console.log(
      classifier.classify("Being polite is always good for the world!")
    );
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
  }
})();
