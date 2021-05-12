# Online Store

This is a fully hosted application on Amazon web service. The aim is to understand the end-to-end process of hosting an application on the cloud.
The frontend presents you with the screen to add goods to cart and as well checkout from the cart section.

## Project Setup
1. Clone the Project using `git clone https://github.com/AhhEagle/projecthost.git`

2. Go into the directory and - `cd myStore` for the front end code

3. Install the dependencies - `npm install `

4. Start the app - `npm start`

5. For the backend code, from the root directory - `cd myStore-api`

6.  Install the dependencies - `npm install `

7. Start the app - `npm run watch`

## Continuous Integration and Deployment

## Hosting
The project is currently hosted on Amazon web service:

### Database
The database is hosted on the aws rds. The postgres database was used. The database was created using the aws web console.
        

### API
The api was hosted on aws elastic Beanstalk service. This can be done as well from the web console or from the command line.
To create it using the command line, after installing the aws cli:
1) While at the folder you can init by using `eb init` and follow the prompt to create an application 
2) set up the environment for the application
3) you can use `eb use <environment name>` to set environment as default
4) the run `eb deploy` to deploy.

The access url for the deployed version of this application:
`http://finalprojecttest-env.eba-q232pwy6.us-east-1.elasticbeanstalk.com/products`


### Front End
The static files were deployed on aws S3 on the bucket name `newudacitybucket` and static files were deployed to it using 
`aws cp --recursive --acl public-read ./build s3://newudacitybucket/` by running the deploy.sh file.


The access url is `http://newudacitybucket.s3-website-us-east-1.amazonaws.com/`

## Continuous Integration and Deployment

Circle CI was integrated to test and as well deploy. The environment configuration was configured on circle ci environmental variable


