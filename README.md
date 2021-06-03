# assignment-headlines-weather-data

Prerequisites:
1. JS
2. node.js
3. postgresql
4. typescript
5. typeorm
6. express
7. redis cache
8. jest
 

Setup Instructions : 

-- Database Design(SQL Server, Stored Procedure):
  1. [AccessTokens] -> Track 1 to n mapping of accesstokens created by user.
  2. [USERS] -> Number of users registered
  
-- Backend Design (Node.js):
  1. Services layer(Businnes Logic)
  2. Controller Layer(Handle URL routing)
  3. Entities(Model Design)
  4. Storage(redis cache)

-- API Endpoint:
  1. GET POST /accessTokens
  2. POST /apiAccess
  3. GET /news
  4. POST /signup
  5. GET /weather
  
-- Authentication:
  1. API Authentication using ACCESS TOKEN.
  
  
You must have node 10.22.1 or later to run this project

Clone this project and RUN npm install to install all dependencies.

npm start to start project at port 1337

You must have redis cache installed
Use following command to install for MAS-OS:
`
brew install redis, 
brew services start redis
 `
 OR 
 you can install it at : https://redis.io/topics/quickstart
 
To TEST this application use : npm test
 
Basic Workflow ::

1. User will register to our system using name, email and password. To do so use our `/signup` endpoint. You need to pass your name, email and password. This endpoint is an open routes and does not require any authentication. Our `/weather` API is also an open routes.
2. To access other API functionality a user must have apiAccess. To gain Access, please contact us. This access is pretty straight forward, we go ahead and update `hasApiAccess` to true.
3. In case if an administrator want's to give an access, he make a call to `/apiAccess` with email in body and with admin name and admin password in headers.
4. Now User must have access to create an access token and use our `/news` API. News API pass through Authentication so you must have an access token to use it.
5. To create an access token Follow our POSTMAN DOCS at https://documenter.getpostman.com/view/13162329/TzY4eESb




 
 
 
 
