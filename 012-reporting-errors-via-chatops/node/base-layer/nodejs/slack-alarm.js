const axios = require("axios");

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
   * @param {string} channelName Name of Slack channel where alert will be raised.
   * @param {string} hookUrl Web hook URL from slack workplace
   * @param {Error} appError Application Error instance.
   */
  sendAlert(channelName, hookUrl, appError) {
    let payload = {
      channel: channelName,
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
        .post(hookUrl, payload)
        .then(() => {
          resolve({ completed: true });
        })
        .catch((error) => {
          reject({ completed: false, error });
        });
    });
  },
};
