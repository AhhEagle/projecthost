### PipelineProcess
The CircleCI version uses 2.1 
## Orbs
The Orbs are set of instructions created by CircleCi that allows us to configure the pipeline on which the actions will run.
I used orbs to setup node js using version 4.1.0, aws-cli using version 1.3.1 and elastic beanstalk using version 1.0.2.
## Jobs
Jobs are groups of command to be run.
I used the jobs to install npm on the frontend and backend 
Jobs was also used to build the frontend and backend. It was also used to deploy the apps on S3 and ElasticBeanstalk