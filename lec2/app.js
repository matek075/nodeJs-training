const todoManager = require('./todoManager');

// Adding tasks
todoManager.addTask("Learn Node.js");
todoManager.addTask("Go shopping");
todoManager.addTask("Write a report");

// Displaying tasks
todoManager.showTasks();

// Removing a task
todoManager.removeTask("Go shopping");

// Displaying tasks again
todoManager.showTasks();