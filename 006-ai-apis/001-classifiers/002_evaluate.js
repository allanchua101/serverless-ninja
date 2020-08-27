const natural = require("natural");
const naiveBayes = natural.BayesClassifier;

naiveBayes.load("./hate-speech-classifier.json", null, (err, classifier) => {
  console.log(classifier.classify("Who likes a Mcdonalds dress anyway"));
  console.log(classifier.classify("I never liked this bitch"));
  console.log(classifier.classify("Are you crazy our out of your mind?"));
});
