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
 * ******************
 * The module system and its patterns
 * ******************
 * A problem in implementing JS in the browser is the gloabl scope it is 
 * instantiated in, which can create situations wherein important variables
 * can be overwritten, leading to instability, or worse. A popular technique
 * to avert this uses Immediately Invoked Function Expressions (IIFEs) to 
 * create a private scope that only exports variables it chooses. 
 * An example:
 */
 const myModule = (() => {
    const privateFoo = () => {}
    const privateBar = []
    const exported = {
    publicFoo: () => {},
    publicBar: () => {}
    }
    return exported
   })() // once the parenthesis here are parsed, the function
    // will be invoked
   console.log(myModule)
   console.log(myModule.privateFoo, myModule.privateBar)
   /**
    * The idea behind this pattern is at the base of CommonJS
    * ******************
    * CommonJS modules
    * ******************
    * CommonJS was the first module system for Node.js. Its main concepts
    * were the require keyword, allowing the importation of modules, and
    * exports and module.exports, which allows the exportation of functionality
    * from the current module.
    * A homemade, simple version of a module system, modeled after CommonJS,
    * is easy to produce knowing the base of it. An example is given in the
    * book.
    * 
    *  
    * 
    */