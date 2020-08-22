# Reporting Errors via ChatOps using AWS Lambda & NodeJS

![Banner](https://github.com/allanchua101/serverless-ninja/blob/master/docs/012-reporting-errors-via-chatops/Banner.png)

This article explains how to do error reporting via ChatOps and how it helps organizations react faster to issues arising from application running inside AWS Lambda Functions. In this demo, I will be using NodeJS and will utilize Slack to deliver alarms to important stakeholders:

- Application Developers
- Software Managers
- Software Testers
- Security Response Team
- Whoever needs to be awake when something is broken

## Benefits

![Benefits](https://github.com/allanchua101/serverless-ninja/blob/master/docs/012-reporting-errors-via-chatops/Benefits.png)

Before we start coding, I think that its necessary to understand the good things that ChatOps bring to the table so that we can explain to our software development teams the importance of the effort we are putting in building this alarm mechanisms.

### Early Detection of Software Issues

Hey, catching bugs in development environment is the best thing a developer should be aiming for about when making mistakes on our code. This allows you to peacefully google the application error and find the right way to fix it.

### Rapid Response to Production Issues

Raising alarms to messaging apps help software engineering teams to gain real-time visibility of issues that reached production stage. This benefits organization by reducing the downtime and impact of application issues to the business.

### It Saves You from Silent Failures

Without ChatOps, background workers fail silently without having the decency to inform you that something went wrong in production. I find this background workers the nastiest of all as it can easily place your job security to a rocking chair. Installing proper error handling and alarm mechanisms saves you from delivering broken work to production.

### Stimulates Collaboration and Learning

Raising issues in a channel where an entire team actively listens benefit organizations in a subtle way by raising awareness which trains your development team on the following topics:

- Why did an issue got raised
- Where the issue can be fixed
- How to actually fix the issue
- How to prevent it from happening again

## Setting up a Slack Hook URL

- Add reference to document here

## Our Solution Architecture

![Solution](https://github.com/allanchua101/serverless-ninja/blob/master/docs/012-reporting-errors-via-chatops/alarm-diagram.jpg)

The diagram above explains our desired solution. To break it down into digestible pieces:

- We are accepting HTTP request to pull ninja and weapon objects
- We are using an API Gateway to handle public traffic and offload it to the appropriate lambda-based API.
- We are using a Lambda layer to share common libraries and functional code between lambda APIs
- We are going to intentionally not provision Dynamo DB tables to simulate connectivity issue.
- We are going to gracefully handle errors and build markdown messages base on their metadata
- We then send the markdown-based message to the Slack Hook URLs
- Stakeholders then react to the notifications

## Implementations

[NodeJS](https://github.com/allanchua101/serverless-ninja/blob/master/012-reporting-errors-via-chatops/node)
