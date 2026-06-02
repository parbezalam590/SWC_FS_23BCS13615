// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];
let currentFilter = 'all';

// Load tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    taskInput.focus();
    
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
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

// Edit task
function editTask(id) {
    const item = document.querySelector(`[data-id="${id}"]`);
    item.classList.add('editing');
    
    const input = item.querySelector('.task-input-edit');
    input.value = item.querySelector('.task-text').textContent;
    input.focus();
}

// Save edited task
function saveTask(id) {
    const item = document.querySelector(`[data-id="${id}"]`);
    const input = item.querySelector('.task-input-edit');
    const newText = input.value.trim();

    if (newText === '') {
        alert('Task cannot be empty');
        return;
    }

    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        saveTasks();
        renderTasks();
    }
}

// Update task count
function updateCount() {
    const activeCount = tasks.filter(t => !t.completed).length;
    taskCount.textContent = activeCount;
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';

    let visibleTasks = tasks;
    
    if (currentFilter === 'active') {
        visibleTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        visibleTasks = tasks.filter(t => t.completed);
    }

    if (visibleTasks.length === 0) {
        taskList.innerHTML = '<li style="text-align: center; padding: 20px; color: #ccc;">No tasks yet</li>';
        updateCount();
        return;
    }

    visibleTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            >
            <span class="task-text">${escapeHtml(task.text)}</span>
            <input 
                type="text" 
                class="task-input-edit"
                value="${escapeHtml(task.text)}"
            >
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="save-btn" onclick="saveTask(${task.id})">Save</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateCount();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Filter tasks
function setFilter(filter) {
    currentFilter = filter;
    
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    renderTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        setFilter(this.dataset.filter);
    });
});

// Handle Enter and Escape in edit mode
document.addEventListener('keydown', (e) => {
    const editingItem = document.querySelector('.task-item.editing');
    if (!editingItem) return;

    if (e.key === 'Enter') {
        const id = parseInt(editingItem.dataset.id);
        saveTask(id);
    } else if (e.key === 'Escape') {
        editingItem.classList.remove('editing');
    }
});

// Initial load
loadTasks();
