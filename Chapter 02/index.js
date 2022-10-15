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
  const privateFoo = () => {};
  const privateBar = [];
  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  };
  return exported;
})(); // once the parenthesis here are parsed, the function
// will be invoked
console.log(myModule);
console.log(myModule.privateFoo, myModule.privateBar);
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
 * An important to detail to know is that 'require' in both Node and
 * the books homemade version is synchronous.
 * Node avoids 'depedency hell' through its clever resolve function,
 * which, when there's conflicting dependecy versions, uses the dependency
 * closest to where resolve was called according to its rules, namely:
 *       If a module starts with /, the path is used as is
 *       If it starts with ./, it is treated as a relative path, and searches
 *           sfor it, straing from the directory of the requestor
 *       If it does not have / or ./, it checks the core Node modules
 *       If it can't find it, it returns the first matching module in the
 *           node_modules directory starting from the requestor, and goes
 *           as far back as needed.
 * Modules are only loaded and evaluated once, and thereafter cached for
 * use again in the code.
 * Circular depedencies are considered an intrinsic design issue, but it
 * is useful to know of them and how they work. An example is presented in
 * the book, and it is as follows:
 */
//module a
exports.loaded = false;
const b = require("./b");
module.exports = {
  b,
  loaded: true, // overrides the previous export
};
//module b
exports.loaded = false;
const a = require("./a");
module.exports = {
  a,
  loaded: true,
};
//main.js
const a = require('./a')
const b = require('./b')
console.log('a ->', JSON.stringify(a, null, 2))
console.log('b ->', JSON.stringify(b, null, 2))
/**
 * The explanation of it is as follows:
 *      1. Main.js requires a.js
 *      2. a.js sets an exported value 'loaded' to false
 *      3. a.js requires b.js
 *      4. a.js sets an exported value 'loaded' to false
 *      5. b.js requires a.js (circular)
 *      6. because a.js was previously traversed, b.js copies the exported
 *      value of a.js into its scope
 *      7. b.js changes its 'loaded' to true
 *      8. b.js finishes execution, returning control to a.js, which then
 *      copies b.js export value to itself
 *      9. a.js sets 'loaded' to true
 *      10. a.js finishes execution, returning control to main.js, which 
 *      then copies the total state of a.js to its scope
 *      11. main.js requires b.js, loading it from a.js' cache
 *      12. main.js copies the total state of b.js to its scope
 * The problem here is that b.js has only a partial view of a.js, which
 * is then copied to both a.js and main.js. Were the files required at
 * different times, the result would be very different. 
 * ******************
 * Module definition patterns
 * ******************
 * The main concern with using modules, especially when defining APIs, is 
 * balancing the private and public functionality: maximizing privacy, and
 * extensibility and code reuse.
 * Naming exports is a basic method of exposing a public API.
 * A popular module definition pattern is one known as the 'substack pattern':
 * it involves setting the module.exports of a module to a single function,
 * and optionally extending it by adding another function under the same 
 * namespace, ex module.exports.functionB. This abides by the 
 * Single-Responsibility Principle (SRP) by having a module have a single
 * functionality it is responsible for.
 * Another pattern would be a module that exports a class, allowing the
 * constructor to be used wherever the module is required.
 * A single instance of a class can be exported as well, allowing it to
 * be required by many js files at once. This, however, does not preclude
 * the possibility of making new instances by simply using the instances
 * .constructor
 * A danger is present in any module, that being its ability to modify 
 * other modules or objects in the global scope, (Monkey Patching). Though
 * this practice can be useful for debugging, it is bad practice. 
 * ******************
 * ESM: ECMAScript modules
 * ******************
 * ECMAScript 2015 added an official module system, ES Modules (ESM), which
 * retained some aspects of previous systems, while making the syntax simple,
 * compact, and easy to understand.
 * The main difference is that, unlike previous JS Module systems, ESM uses
 * static modules, meaning they cannot be changed during runtime nor can they
 * be controlled by flow statements, allowing easier elimination of dead 
 * code.
 * Node.js presupposes all modules to be written using CommonJS syntax, so
 * special care must be had when writing in ESM syntax, namely either 
 * changing the file extension to .mjs or having a .json file with "type" 
 * set to "module"
 * Exports and imports are handled in a slightly different way. In ESM,
 * everything is private except that which is explicitly exported using the
 * "export" keyword, as in "export function a(){...}".
 * Imports use three keywords: "import", to initiate an import; "as", to
 * (optionally) name the imported thing; and "from", to specify the module.
 * For example, "import {a as b} from './function.js'" (* to import all).
 * Default exports and imports are handled as follows: when using export, 
 * the keyword "default" is used immedidately after, making whatever follows
 * the default export. This means it can be imported and renamed without
 * the use of "as." For example: 
 * "export default function a(){}"
 * "import b from './functions.js'"
 * Both named and default exports can be imported at the same time in the
 * following manner:
 * "import defaultF, { namedF } from './functions.js'"
 * Though sometimes convenient, and used by Node.js and React, it is 
 * considered good practice to use only named exports, since it can make 
 * dead code elimination easier. 
 */
