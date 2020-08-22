# Errors Notifications via ChatOps (Slack + NodeJS)

This section of the repository aims to showcase a NodeJS implementation of sending error notifications via Slack-based ChatOps.

### What do you need to test it

- AWS CLI
- AWS SAM CLI
- AWS Account
- Shell script execution environment (Linux, MAC, WSL)
- Named profile for your AWS CLI
- S3 Bucket for SAM artifact storage
- NodeJS

### Deploying the Application

1. If you are a Linux or Mac User you need to provide execution permission to shell scripts inside the root of this folder. If you a windows user, go ahead and ignore this step.

   ```sh
   chmod +x *.sh
   ```

2. You will need to run the `001_install_dependencies.sh` script to install node modules for the base layer and the API folders.
3. You will have to copy the `base-layer\nodejs\slack.config.sample.json` file to `base-layer\nodejs\slack.config.json` and provide your own Slack web hook URLs and desired channel name. Without configuring this, you will get our dreaded silent failure issue that can only be diagnosed via CloudWatch logs.
4. After running the shell script, you will have to release the APIs CloudFormation stack by executing `002_release_apis.sh` script. To verify that step 3 worked gracefully, you can go and visit your AWS account's CloudFormation portal and should be able to see a CloudFormation stack named **dev-ninja-alarms**. This will contain the AWS resources listed below:

   - 1 API Gateway
   - 1 API Key
   - 1 API Usage Plan
   - 2 Lambda Functions
   - 2 IAM Roles
   - 1 Lambda Layer
   - 4 Lambda Permissions (2 for CORS, 2 for GET)

### Testing the Alarms

To ease testing, you can navigate to the API Gateway section of your AWS console and find the gateway named `dev-ninja-alarms` and view it's resource list. Trigger any endpoint using the test command visible below:

![Endpoint Test Button](https://github.com/allanchua101/serverless-ninja/blob/master/docs/012-reporting-errors-via-chatops/testing-endpoints.png)

### View the Generated Alarms

![Endpoint Test Button](https://github.com/allanchua101/serverless-ninja/blob/master/docs/012-reporting-errors-via-chatops/slack-alarms-result.png)

You should be able to get the following error message on the Slack channel that you linked with with incoming web hook URL.

### How Did it Work?

1. We created an awesome module named `base-layer\nodejs\slack-alarm.js` inside the shared lambda layer folder with the following code:

   ````js
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
   ````

2. Last, we configured both Lambda-based APIs to catch any form of exception that can arise from the Lambda's execution scope.

   ```js
   // Code omitted for brevity
   const { sendAlert } = require(process.env.AWS
     ? "/opt/nodejs/slack-alarm"
     : "../base-layer/nodejs/slack-alarm");

   module.exports = {
     async execute(event, context) {
       // Code omitted for brevity

       try {
         // Code omitted for brevity
       } catch (err) {
         await sendAlert(err);

         return buildResponse(500, { issue: "Internal server error" });
       }
     },
   };
   ```

### Decommissioning the CloudFormation

I know that Lambda is super cheap, you can even leave your APIs running and they wont cost you anything significant. However, to keep your personal AWS accounts from getting cluttered, I do recommend decommissioning the CloudFormation stack for this sample using the script `003_decommission_apis.sh`.

### Help Me Improve the Documentation

This repository is still under development and I would highly appreciate if you could point out challenges that you've faced while using this documentation. Please don't hesitate to raise issues in the repository if you have any questions, concerns or request features. I would also accept code contributions for the Golang and Python samples of this demo.
