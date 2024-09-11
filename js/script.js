// Get elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Add new task
addTaskButton.addEventListener('click', () => {
    if (taskInput.value.trim() !== '') {
        addTask(taskInput.value);
        taskInput.value = '';
        showNotification('Task added successfully.');
    }
});

// Add task to the list and save to localStorage
function addTask(taskText) {
    const task = document.createElement('li');
    task.innerHTML = `
        <span>${taskText}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        <button class="toggle">Complete</button>
    `;
    
    task.querySelector('.delete').addEventListener('click', () => {
        task.remove();
        updateLocalStorage();
        showNotification('Task deleted successfully.');
    });

    task.querySelector('.edit').addEventListener('click', () => {
        const newTaskText = prompt('Edit task:', task.querySelector('span').textContent);
        if (newTaskText) {
            task.querySelector('span').textContent = newTaskText;
            updateLocalStorage();
            showNotification('Task edited successfully.');
        }
    });

    task.querySelector('.toggle').addEventListener('click', () => {
        task.classList.toggle('completed');
        updateLocalStorage();
    });

    taskList.appendChild(task);
    updateLocalStorage();
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text, task.completed);
        if (task.completed) {
            taskList.lastElementChild.classList.add('completed');
        }
    });
}

// Update localStorage
function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '10px';
    notification.style.background = '#0B9586';
    notification.style.color = '#fff';
    notification.style.borderRadius = '4px';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
