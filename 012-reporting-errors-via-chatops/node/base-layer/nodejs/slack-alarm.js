const axios = require("axios");
const moment = require("moment");
const slackConfig = require("./slack.config.json");

let buildMarkdown = (err) => {
  let output = "";

  output += `Something went wrong on our application! :boom:\n`;
  output += `*Lambda Function Name:* ${process.env.AWS_LAMBDA_FUNCTION_NAME}\n`;
  output += `*Error Message:* [${err.message}]\n`;
  output += `*Stack Trace:*\n`;
  output += "```";
  output += `${err.stack}`;
  output += "```";
  output += `\n`;

  return output;
};

/**
 * @module slackNotifier
 * @description Module used for sending messages to Slack Channels.
 * @author Allan A. Chua
 * @version 1.0
 * @since August 22, 2020
 */
module.exports = {
  /**
   * @function sendAlert
   * @description Method used for sending ChatOps alerts to slack channel.
   * @param {Error} appError Application Error instance.
   * @returns {Promise<object>} Promise indicating completion of request.
   */
  sendAlert(appError) {
    let payload = {
      channel: slackConfig.slackChannelName,
      attachments: [
        {
          author_name: "Alarm Bot",
          text: buildMarkdown(appError),
          mrkdwn: true,
          color: "#FF0000",
          ts: moment().unix(),
        },
      ],
    };

    return new Promise((resolve, reject) => {
      axios
        .post(slackConfig.slackHookUrl, payload)
        .then(() => {
          resolve({ completed: true });
        })
        .catch((error) => {
          reject({ completed: false, error });
        });
    });
  },
};
