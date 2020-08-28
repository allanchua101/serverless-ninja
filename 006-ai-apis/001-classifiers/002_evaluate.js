const natural = require("natural");
const csv = require("csvtojson");
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

let loadData = () => {
  return new Promise((resolve) => {
    csv()
      .fromFile("./dataset/hate_speech.csv")
      .then((json) => {
        resolve(json);
      });
  });
};

let getLabel = (n) => {
  let lookup = new Map();

  lookup.set("0", "Hate Speech");
  lookup.set("1", "Offensive Language");
  lookup.set("2", "Neither");

  if (lookup.has(n)) {
    return lookup.get(n);
  }

  return "Unknown";
};

(async () => {
  try {
    let [classifier, data] = await Promise.all([loadFrozenModel(), loadData()]);
    let results = data.map((i, idx) => {
      let actual = getLabel(i.class_id);
      let predicted = classifier.classify(i.tweet);

      console.clear();
      console.log(`Inferring Item ${idx + 1} out of ${data.length}`);

      return {
        tweet: i.tweet,
        actual,
        predicted,
        isCorrect: actual === predicted,
      };
    });
    let accurateHit = results.filter((i) => i.isCorrect);
    let missedItems = results.filter((i) => !i.isCorrect);
    let accuracy = (accurateHit.length / data.length) * 100;
    let errorRate = (missedItems.length / data.length) * 100;

    console.log(`Accurate: ${accurateHit.length} items`);
    console.log(`Missed: ${missedItems.length} items`);
    console.log(`Accuracy: ${accuracy.toFixed(2)}`);
    console.log(`Error Rate: ${errorRate.toFixed(2)}`);
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
  }
})();
