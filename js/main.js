
let tasks = [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Reindex task IDs to ensure sequential numbering
function reindexTasks() {
    tasks.forEach((task, index) => {
        task.id = index + 1;
    });
}

// Add a task
function addTask() {
    const description = prompt("Enter task description:");
    if (!description) {
        console.log("Task description cannot be empty.");
        return;
    }

    const task = {
        id: tasks.length + 1,
        description: description,
        completed: false
    };
    tasks.push(task);
    console.log(`Task "${description}" added.`);
    saveTasks();
}

// View all tasks
function viewTasks() {
    if (tasks.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('Tasks:');
        tasks.forEach(task => {
            console.log(`${task.id}. ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]`);
        });
    }
}

// Toggle task completion
function toggleTask() {
    const id = parseInt(prompt('Enter task ID to toggle:'));
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        console.log(`Task "${task.description}" marked as ${task.completed ? 'completed' : 'not completed'}.`);
        saveTasks();
    } else {
        console.log('Task not found.');
    }
}

// Remove a task by ID
function removeTask() {
    const id = parseInt(prompt('Enter task ID to remove:'));
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        const removedTask = tasks.splice(taskIndex, 1);
        reindexTasks(); // Reindex tasks after removal
        console.log(`Task "${removedTask[0].description}" removed.`);
        saveTasks();
    } else {
        console.log('Task not found.');
    }
}

// Update task description
function updateTask() {
    const id = parseInt(prompt('Enter task ID to update:'));
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newDescription = prompt('Enter new description:');
        if (newDescription) {
            task.description = newDescription;
            console.log(`Task ${id} updated to "${newDescription}".`);
            saveTasks();
        }
    } else {
        console.log('Task not found.');
    }
}

// Search tasks by name
function searchTasks() {
    const keyword = prompt('Enter keyword to search:');
    const filteredTasks = tasks.filter(task => task.description.toLowerCase().includes(keyword.toLowerCase()));
    if (filteredTasks.length > 0) {
        console.log('Matching tasks:');
        filteredTasks.forEach(task => {
            console.log(`${task.id}. ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]`);
        });
    } else {
        console.log('No matching tasks found.');
    }
}

// Display advanced menu
function displayMenu() {
    console.log("\n--- Task Manager Menu ---");
    console.log("1. Add Task");
    console.log("2. View All Tasks");
    console.log("3. Toggle Task Completion");
    console.log("4. Remove Task");
    console.log("5. Update Task");
    console.log("6. Search Tasks");
    console.log("7. Exit");
    console.log("------------------------\n");
}

// Command interface in the console
function runTaskManager() {
    loadTasks();
    let running = true;
    while (running) {
        displayMenu();
        const command = parseInt(prompt('Choose an option (1-7):'));
        switch (command) {
            case 1:
                addTask();
                break;
            case 2:
                viewTasks();
                break;
            case 3:
                toggleTask();
                break;
            case 4:
                removeTask();
                break;
            case 5:
                updateTask();
                break;
            case 6:
                searchTasks();
                break;
            case 7:
                running = false;
                console.log('Exiting Task Manager.');
                break;
            default:
                console.log('Invalid command. Please choose a number between 1 and 7.');
                break;
        }
    }
}

// Start the Task Manager when the page loads
window.onload = function() {
    runTaskManager();
};