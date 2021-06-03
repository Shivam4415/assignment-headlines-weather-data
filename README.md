# assignment-headlines-weather-data

Prerequisites Knowledge:
- nodejs
- redis cache
- typescript
- postgres
- jest

You must have node 10.22.1 or later to run this project

Clone this project and RUN npm install to install all dependencies.

npm start to start project at port 1337

You must have redis cache installed
Use following command to install for MAS-OS:
`
brew install redis
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




 
 
 
 
