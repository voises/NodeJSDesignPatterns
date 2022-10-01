/**
 * Notes for chapter 1
 ***************************** 
 * Node.js Philosophy
 * ********
 * In short, simple is better. Small core, single-purpose modules, and 
 * above all good practical code
 * ********
 * How Node.js works
 * ********
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
 * split into 6 parts
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
 * 
 */