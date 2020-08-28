# Building JS-based Hate Speech Classification Model

This section contains a simple implementation of hate speech classification using the following technologies:

- NodeJS
- Natural JS
- csvtojson

### Purpose

The classification model showcased in this section is used for determining if a certain text fed to it contains:

- Hate Speech
- Offensive Language
- Neither

### Why you did not embed any validation (K-Fold or 75 / 25 % train test split)?

Splitting and folding of train dataset was not included in this repository because it was mainly targeted at beginners and to quickly on-board them to different ways of deploying machine learning models to AWS Lambda-based APIs.

### Dataset Credits

This repository is utilizing a dataset that t-davidson built on this github [repository](https://github.com/t-davidson/hate-speech-and-offensive-language).

### Natural JS - Naive Bayes Results

The Naive Bayes classifier produced the following results:

```txt
Accurate: 17706 items
Missed: 7077 items
Accuracy: 71.44
Error Rate: 28.56
```

71.55% accuracy is not that bad! If you are automating curation of chatbot messages, this classification model can remove 71.55% of work from your staff.
