/**
 * Notes for chapter 1
 ***************************** 
 * Node.js Philosophy
 * ******************
 * In short, simple is better. Small core, single-purpose modules, and 
 * above all good practical code
 * ******************
 * How Node.js works
 * ******************
 * I/O is generally slow during code execution. The problem can be amplified
 * by how the code is written. Blocking I/O can stall a program, even if it
 * is multithreaded. 
 * Non-blocking I/O is better, though even then there 
 * are better ways of doing it. Using a busy-waiting cycle can be costly,
 * using the cpu to iterate over an array to poll for resources
 * Event demultiplexing is, simply put, the act of breaking up a task
 * into components which can be dealt with at a time, which is much more
 * efficient than the busy-waiting cycle.
 * An important structure to remember is the reactor pattern, which is
 * split into 6 parts:
 *      1. an I/O operation is requested from the event demultiplexer
 *      with a specific handler, for when the op is completed, by the
 *      application. This is non-blocking, returning control to the app
 *      2. The event and its associated handler are placed in the queue,
 *      awaiting to be called
 *      3. the event loop goes through the queue one at a time
 *      4. a chosen event then invokes the handler
 *      5. the handler then, after it requests potential additional
 *      operations, gives back control to the event loop
 *      6. once the event queue is fulfilled, the event loop awaits
 *      another event to restart the cycle
 * At the heart of Node is libuv, the native library responsible for the
 * reactor pattern at the heart of Node. It is native to Node.
 * Aside from libuv, bindings for libuv to  be useful to JS, the V8 engine
 * devoloped for chrome, and a core JS library that can implement Node.js
 * API are the base for Node.js
 * ******************
 * Javascript in Node.js
 * ******************
 * Unlike JS used in the browser, Node doesn't have access to window,
 * document, or the DOM, but it can use the underlying OS's services, like
 * filesystem access, low-level TCP or UDP sockets, creation of http 
 * servers, child processes, and many more. 
 * Further, the trouble of having different levels of compatibility from
 * browser to browser, and js version to js version, is virtually 
 * non-existing for Node.
 * Node is also capable of using already existing code written in C/C++, 
 * which can be used in a variety of ways, one of which being IoT and 
 * homemade robotics. JS virtual machines can also use Web assembly to 
 * compile languages other than JS, like C++ and Rust.
 */