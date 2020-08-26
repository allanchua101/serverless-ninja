# Pros and Cons of AWS Serverless Express

You are probably here because:

- You are a NodeJS developer
- You have used Express as your API framework
- You are looking into migrating API workloads towards a serverless-based architecture
- You are looking into getting started quickly with AWS Lambda but somehow overloaded by new concepts

Well if I manage to identify your probable identity, you came to the right place as this article intends to showcase the good and bad things about [AWS serverless express](https://github.com/awslabs/aws-serverless-express) framework from an architect's point of view.

## Main Differences of Serverless Express & Express

Basically, Serverless Express is a NodeJS-based API framework used for mimicking the routing capabilities of Express framework for NodeJS. The main differences between serverless-express and express are:

- serverless-express is meant to run inside Lambda Functions, while express is expected to run inside virtual machines or Docker containers.
- serverless-express does not manage state because is was meant to run in across different underlying lambda functions. This means that any form of attempt to store session-related state inside the api instance will fail as lambda functions tend to evaporate after 15 minutes of idle compute time.

Now that we are aware of the critical differences between the two express frameworks, we can start diving into the good and bad things associated with using serverless-express.

### Advantage # 1 - Serverless Express Speeds Up Migration

Utilizing serverless express for migration of express-based workloads to a serverless-based architecture reduces the effort required from the side of developers because:

- The routing implementation between the two frameworks is similar which results to lower cognitive barrier between mindsets required to build on top of the two frameworks.
- Developers don't have to modify the restful routes that exist in the applications
- Frontend developers don't have to update their client-side code to point GUI modules to new routes.
- Developers can copy paste controller-level code to the express implementation.

### Advantage # 2 - Reduction in SAM and Cloud Formation

Since serverless express require only one lambda function to run, the definition of SAM and CloudFormation code becomes easier as you don't have to mind about acquiring advance infrastructure as code skills to run your serverless workloads. This also makes the SAM template easier to maintain and read from a new joiner's point of view (Basically, any code that is concise and can fit in one screen is easy to maintain).

### Advantage # 3 - Faster Deployments

Since serverless express does not require you to have more than one lambda function to run all your APIs, it allows your to achieve faster deployments because:

- You only have a single set of node modules
- SAM is only required to package/zip one set of lambda functions
- SAM only have to upload two artifacts as compared to to the traditional deployment scale (`artifact` x `API Count`) + 1

### Advantage # 4 - Standard Version of Dependencies

Since serverless express only require you to have one set of node modules to get up and running, you can rest assured that you have a standard and identical version of each library that you are utilizing across your API code base.

## Summarizing Advantages

- Speeds up migration of existing API workloads to serverless
- It reduces the amount of SAM and Cloud Formation you need to define
- It offers faster deployments since you have a single set of libraries
- It allows your team to have a standard version of dependencies

### Disadvantage # 1 -
