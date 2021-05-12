### INFRASTRUCTURE 
 The project was hosted on Amazon Web Services. It utilises AWS RDS, AWS Elastic Beanstalk and AWS S3

## AWS RDS
The project uses AWS Relational Database Service. It uses postgres.

## AWS Elastic Beanstalk

The project api is hosted on aws elastc beanstalk and environmental variables are set on it. 
The api was hosted on aws elastic Beanstalk service. This can be done as well from the web console or from the command line.
To create it using the command line, after installing the aws cli:
1) While at the folder you can init by using `eb init` and follow the prompt to create an application 
2) set up the environment for the application
3) you can use `eb use <environment name>` to set environment as default
4) the run `eb deploy` to deploy.

### AWS S3
The static files are hosted on s3. The static files were deployed on aws S3 on the bucket name `newudacitybucket` and static files were deployed to it using 
`aws cp --recursive --acl public-read ./build s3://newudacitybucket/` by running the deploy.sh file.
