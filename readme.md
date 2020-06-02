# Rest Api for hafas-client 

Rest Api service for the [hafas-client](https://github.com/public-transport/hafas-client) library (work in progress).

The OpenAPI compliant Rest Api is generated by using the [Tsoa](https://github.com/lukeautry/tsoa) Framework.

It is possible to [generate](./src/generator/readme.md) the controller methods from the TypeScript declaration file.

## Installation

* npm install
* Tsoa can't get [interfaces from node_modules](https://github.com/lukeautry/tsoa/blob/master/docs/ExternalInterfacesExplanation.MD), therefore copy types to src: **./scripts/prepare-hafas-types**
* optional: generate controller methods: **./scripts/generate-controller-methods**
* create routes: **yarn run tsoa routes**
* create OpenApi specs: **yarn run tsoa spec**
* compile to javascript: **tsc**
* start the server: **node build/server.js**
