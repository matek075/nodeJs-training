const todoManager = (() => {
    const tasks = [];

    return {
        addTask: (task) => {
            tasks.push(task);
            console.log(`Added task: ${task}`);
        },
        removeTask: (task) => {
            const index = tasks.indexOf(task);
            if (index !== -1) {
                tasks.splice(index, 1);
                console.log(`Removed task: ${task}`);
            } else {
                console.log(`Task "${task}" does not exist.`);
            }
        },
        showTasks: () => {
            if (tasks.length === 0) {
                console.log("No tasks available.");
            } else {
                console.log("Task List:");
                tasks.forEach((task, index) => {
                    console.log(`${index + 1}. ${task}`);
                });
            }
        }
    };
})();
// IIFE (Immediately Invoked Function Expression) is used to create a private scope for the tasks array.


module.exports = todoManager;