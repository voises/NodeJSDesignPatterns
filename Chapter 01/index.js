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
 * Event demultiplexing. 
 */