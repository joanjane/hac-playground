# Handy Angular Components playground

This project is a sample project that uses [Handy Angular Components library](https://github.com/joanjane/handy-angular-components).

Features:
* A bit more real world demos using _Handy Angular Components_
* Localization via ngx-translate
* AOT and JIT compilation via npm scripts on package.json
* *Multiple root components* setup (cool right?). Use angular 2+ as a pure component framework without the need of creating a SPA or using a single root component. See [app.module.ts](https://github.com/joanjane/hac-playground/blob/master/src/app/app.module.ts#32) to learn how to bootstrap more than one component.

## Development

Run `npm start` to build the demo in watch mode. Run `npm run serve` in another console to start a server and navigate to `http://localhost:8000/`.

## Build

Run `npm run build:debug` to build the project in JIT (Just in Time). The build artifacts will be stored in the `dist/` directory.
Run `npm run build:release` for a production build in AOT (Ahead of Time).

## Run linting

Run `npm run lint` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.
