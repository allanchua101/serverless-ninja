# Shared Layers

![Banner](https://github.com/allanchua101/serverless-ninja/blob/master/docs/005-shared-layers/Banner.png)

Lambda-based APIs require each endpoint to be packaged in isolation. This fact often results to the following issues in API source codes:

- Common libraries / frameworks used by multiple APIs are duplicated
- Common application level code (Auth, Response Formatting, DB accessing) are duplicated
- Duplicate application level code become inconsistent when updates are made
- Builds become heavier as frameworks are duplicated across each endpoint

To solve the problem, AWS introduced the concept of Lambda Layers which enabled sharing of common code and dependencies across Lambda-based APIs.

The purpose of this section is to showcase a POC of sharing common code using Lambda Layers.

### Project Structure

```txt
│   base-layer                        ----> Directory containing shared code across APIs
│   ninja-get-list                    ----> Endpoint for retrieving registered ninjas
│   weapons-get-list                  ----> Endpoint for retrieving registered weapons
│   001_install_dependencies.sh       ----> Shell script used for installing Node Modules
│   002_release_tables.sh             ----> Shell script used for provisioning DynamoDB tables
│   003_release_apis.sh               ----> Shell script used for releasing Lambda Layer + APIs
│   004_decommission_apis.sh          ----> Shell script used for decommissioning APIs
│   005_decommission_tables.sh        ----> Shell script used for decommissioning DynamoDB tables
│   apis.sam.yaml                     ----> SAM template used for defining Layer, Lambdas, API Gateways
│   tables.cfn.yaml                   ----> Cloud Formation template used for defining Dynamo DBs
│   .gitignore                        ----> You know wth is this
│   README.md                         ----> Code documentation
```

[Go Back To Repository Root](https://github.com/allanchua101/serverless-ninja)
