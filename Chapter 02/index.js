/**
 * Notes for Chapter 2
 * ************************
 * The need for Modules
 * ******************
 * Modules are helpful for the following reasons:
 * Organization of large pieces of code into smaller, easily testable, pieces
 * Generalization of code, encouraging repurposing of existing code (DRY)
 * Hiding complexity and private information by only exporting simple code
 * ******************
 * Module systems in Javascript and Node.js
 * ******************
 * Before there was official support for modules in JS, a few different
 * initiatives were made, culminating in asynchronous module definition(AMD)
 * from RequireJS and later Universal Module Definition.
 * Node, having the opportunity to add modules natively, used the implementation
 * from CommonJS.
 * With the advent of ECMAScript 6, there was an official proposal for how
 * to implement modules. It is the understanding of the book authors that
 * ECMAScript modules (EM) will be the de facto way to manage modules in JS
 * 
 * 
 */