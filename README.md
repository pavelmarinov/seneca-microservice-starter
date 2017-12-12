# Starter project for microservices architecture with SenecaJS and Docker

## Summary
This is a starter project for creating microservices architecture with NodeJS, SenecaJS, TypeScript and Docker. Services are using AMQP transport for communication. The sample microservice is a really simple service that is doing calculation of sinus and cosinus functions based on the input provided.

## Setup
In order to run the project you need to have the following installed:

1. [Node](https://nodejs.org/en/download/) - version 8.x and above.  

2. [Docker CE and Docker Compose](https://docs.docker.com/engine/installation/) - compose will probably be part of your docker installation.

## Install
Through npm,
```
npm install
```
## Build & Run

**Build docker containers** - there are two docker scripts called 'docker-compose.yml' and 'docker-compose-system.yml'. The first one contains our microservices (in this starter project only one service). The second script contains common services for the whole environment like our message broker RabitMQ in this starter project. You could put MongoDB here too for example or another database engine.
```
docker-compose build
docker-compose -f .\docker-compose-system build
```

**Configuration parameters** are organized via [node-config module](https://www.npmjs.com/package/config) in JSON files like the following:
```
{
    "API_PORT": "3000",
    "AMQP_CONSUMER_URI": "amqp://guest:guest@rabbit:5672",
    "AMQP_PRODUCER_URI": "amqp://guest:guest@rabbit:5672",
    "NODE_ENV": "dev"
}
```
where API_PORT is the port for the HTTP API (if needed) that our microservice exposes. AMQP_PRODUCER_URI and AMQP_CONSUMER_URI are the URIs of our RabbitMQ message broker where producers are the clients and consumers are the listners of the exchanged messages.

**Build steps** are organized as npm scripts similar to the [TypeScript Node Starter project](https://github.com/Microsoft/TypeScript-Node-Starter#running-the-build) with few differences related to our Docker setup. 

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build before starting all watch tasks. Can be invoked with `npm start`                  |
| `build`                   | Full build. Runs ALL build tasks (`build-ts`, `tslint`)                                           |
| `up`                      | Runs nodemon on `dist/server.js` which is the service entry point                                 |
| `watch`                   | Runs all watch tasks (TypeScript, Node).                                                          |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                               |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed               |
| `tslint`                  | Runs TSLint on project files                                                                      |
| `docker-debug`            | Runs `watch-ts` and `docker-compose up` which starts all the services with nodemon in debug mode as you can see in the compose script |


**Two commands are necessary to bring to live our environment:**
1. Run the compose system script that is mandatory for the whole infrastructure via `docker-compose -f .\docker-compose-system.yml` up. 
2. `npm run docker-debug` to have our microservices up & running.  

_It's important to execute the steps in this order because microservices need to be started after the message broker is already up & running._  
At this point our microservice should be running and returning results via HTTP GET requests like this one: [http://localhost:3000/api/math/sin/10](http://localhost:3000/api/math/sin/10)

## Project Structure

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from the TypeScript build. This is the code you ship.  |
| **lib**                  | All the business logic of the microservice is contained in this folder organized in plugins. Utilities and helpers are here too.                                                                                        |
| **lib**/mathPlugin.ts    | Business logic of our microservice.                                                           |
| **lib**/returnStatus.ts  | The type that every function of the service is returning. Contains status (boolean success code) and value                                                                                                                      |
| **svc**                  | This folder contains the plumbing code of our microservice.                                   |
| **svc**/api.ts           | This file and the next one are in practice our HTTP API that is exposed from our microservice. They are not mandatory and are just another interface that can be used for accessing the functionality of the service. Actually this is a separate service that acts as a client to our main service and forwards requests to the service and responses from it via HTTP.                                                                                                                      |
| **svc/**/app.ts          | Setup of the HTTP API via `seneca-web` and `express` npm packages.                            |
| **svc**/const.ts         | Contains our config parameters that are read from the config file.                            |
| **svc**/service.ts       | Contains  the plumbing code for the main service.                                             |
| index.ts                 | Entry point of the microservice.                                                              |

## Debug in VSCode
**vscode-launch.json** contains configuration for attaching to the nodemon process in the running docker container in order to debug the service. It is convenient to setup this in order to have "F5" debugging in vscode for all your microservices. With watch scripts and the compose setup (local folders and remote folders in the container are mapped) you can edit your source, build and debug on the fly in the container once you are attached to the nodemon process which really speeds up the dev process and is pretty cool.  
Copy this file to your **.vscode/launch.json** file to start debugging easily.  
This workflow is not specific to vscode and could be setup easily with other IDEs through which you can attach to nodemon.
