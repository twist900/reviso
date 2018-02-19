# Reviso

Simple time tracking for freelancers

# Features
  - Register the time spent on projects
  - Get an overview of time registrations

# Technologies
  - Node.js
  - React.js
  - MongoDB

# Installation

With Docker:
```
docker-compose up
```

Without docker:

MongoDB must be installed and running on the machine

Start the server:
```
cd backend

cp .env.example .env

yarn install

yarn start
```

Start the client:
in package.json change
```  "proxy": "http://backend:8080" ```
to
``` "proxy": "http://localhost:8080" ```

```
cd frontend

yarn install

yarn start
```

## Running the tests

```
cd backend

yarn test
```
