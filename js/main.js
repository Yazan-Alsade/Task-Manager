
let tasks = [];

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const description = taskInput.value.trim();
    if (description) {
        const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1; // Automatically generate ID
        tasks.push({
            id: newId,
            description: description,
            completed: false
        });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

// Render tasks in the task list
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => task.description.toLowerCase().includes(searchQuery));
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskDesc = document.createElement('span');
        taskDesc.className = 'task-desc';
        if (task.completed) {
            taskDesc.classList.add('task-completed');
        }
        taskDesc.textContent = task.description;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
        toggleBtn.onclick = function() {
            toggleTask(task.id);
        };

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            removeTask(task.id);
        };

        actions.appendChild(toggleBtn);
        actions.appendChild(removeBtn);

        taskItem.appendChild(taskDesc);
        taskItem.appendChild(actions);

        taskList.appendChild(taskItem);
    });
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Remove task by ID
function removeTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// Clear all tasks
function clearAllTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

// Toggle all tasks
function toggleAllTasks() {
    tasks.forEach(task => {
        task.completed = !task.completed;
    });
    saveTasks();
    renderTasks();
}

// Search tasks
function searchTasks() {
    renderTasks();
}

// Load tasks on page load
window.onload = function() {
    loadTasks();
};