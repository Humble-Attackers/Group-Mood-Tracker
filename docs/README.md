# Project #2 Sample Outline
Please add notes for how to setup your project

## Installation
You need to create the database and setup the .env to run this. 
You may also need to do an npm install...

### Create Database
Use mysql_workbench OR:

mysql -u root -p{your-db-password} tasks < docs/schema.sql

mysql -u root -p{your-db-password} tasks < docs/seed.sql

### Adjust .env
!IMPORTANT Please change the password in .env for DB_PWD:
DB_NAME=tasks
DB_PWD=(your-db-password)

## Run Locally
node server.js

open browser to http://localhost:8080

## Deployment to Heroku
You will need to configure environmental variables for the .env above to correspond to your 
jawsDB.

## Stylistic Notes
This code has been written towards keeping it clean and simple, yet self-explanatory.

It has also been written in a style to sheppard us into the style used in React, 
hence the onClick listeners embedded in the HTML.

We try to use ES6 async functions for clean handling of asyncronous functions.

We serve RESTful API calls on the backend, as is good modern programming practice.

Finally we illustrate how npm packages can be used on the server and client side (moment.js)

Enjoy! Feel free to use this as a template towards your next project!