# Slack Clone - API

## Objective
I would like to play with [Nestjs](https://nestjs.com/) and [TypeORM](http://typeorm.io/#/). The goal of this repo is to expose an API with Nestjs and TypeORM in order to create a Slack clone with [Vue](https://vuejs.org/) + [Vue Class component](https://github.com/vuejs/vue-class-component) and the new [Vue CLI 3](https://github.com/vuejs/vue-cli) that will be hosted in another repo.

## Disclaimer
I am starting to code with Nest and TypeORM at the starter date of this repo (5 July 2018). You may find some things that could be improved in terms of organization and/or code because my experience with the Nest/TypeORM is zero and with Typescript is quite small.

One of the things that might sound wierd is the fact that I am using classes to define interfaces.
Thats because Nest's documentation says that:
> "_What may be surprising, we recommend using classes here. [Instead of interfaces] Why? Classes are part of the JavaScript ES6 standard, and therefore they represent just plain functions. On the other hand, TypeScript interfaces are removed during the transpilation, Nest can't refer to them. It's important because features such as Pipes enable additional possibilities when they have access to the metatype of the variable._"

## Features
Below is listed the features that I am aiming to support with the API.

- Registration ✓
- Login ✓
- JWT authentication ✓
- Manage channels
- Send/Receive messages in channels
- Upload Files
- Direct messages
- Account settings

## Installation

```bash
$ npm install
```

## Running the app
Create a new file **.env** on the root directory. Take a look at **.env.example** to check which variables are needed to start the server.

After start the application, server will be running on port 3000.

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Updates
#### 8 July 2018

I am amazed about how easy it was to create the registration/login feature plus the JWT authentication mechanism in 24 hours. I know that it is earlier but I already felt that Nest and TypeORM are awesome. Both have good documentation and are easy to play with.


## Discussion
If you would like to discuss something regarding this repo, create a new issue or drop me a line to **tiagofscoelho@gmail.com**.
