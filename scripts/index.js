let global_id = 1;
// tasks and deletedTasks arrays
let tasks = [];
let deletedTasks = [];
// Initializing Local Storage
localStorage.setItem('task', JSON.stringify(tasks));
localStorage.setItem('dtask', JSON.stringify(deletedTasks));

// Table Body
let tableBody = document.querySelector('.tableBody');

// Input
let inputTitle = document.querySelector('#task-input').value;
// Updates input value
let input = document.querySelector('#task-input');
input.addEventListener('change', function() {
    inputTitle = input.value;
})

// Priority Level
let prioritySelect = document.getElementById("priority").value;
// Update Priority
let priorityx = document.getElementById("priority")
priorityx.addEventListener('change', function() {
    prioritySelect = priorityx.value;
})

function clearInput() {
    document.getElementById("todoName").value = ``;
}

function clearTable() {
    tableBody.innerHTML = ``;
}

function createTask() {
    let obj = {
        id: global_id++,
        name: inputTitle,
        priority: prioritySelect,
        status: 'pending',
    }

    if (inputTitle) {
        tasks.push(obj);
        displayTask();
    } else {
        alert(`Title cannot be empty`);
    }
}

function displayTask() {
    clearTable();
    tasks.forEach((t) => {
        let tableRow = document.createElement('tr');
        tableRow.setAttribute('id', `${t.id}`);

        let tdName = document.createElement('td');
        tdName.innerHTML = `${t.name}`;

        let tdPriority = document.createElement('td');
        if (t.priority === 'low') {
            tdPriority.innerHTML = `<span class='p-low'>${t.priority}</span>`;
        } else if (t.priority === 'medium') {
            tdPriority.innerHTML = `<span class='p-medium'>${t.priority}</span>`;
        } else if (t.priority === 'high') {
            tdPriority.innerHTML = `<span class='p-high'>${t.priority}</span>`;
        }

        let tdStatus = document.createElement('td');
        statusBtn = document.createElement('button');
        statusBtn.setAttribute('onclick', `changePriority(${t.id})`);
        // Status button styling
        if (t.status === 'pending') {
            statusBtn.setAttribute('class', 'status-button')
        } else if (t.status === 'in-progress') {
            statusBtn.setAttribute('class', 'status-button-inp')
        } else if (t.status === 'complete') {
            statusBtn.setAttribute('class', 'status-button-comp')
        }
        statusBtn.innerHTML = `${t.status}`
        tdStatus.appendChild(statusBtn);

        let tdRemove = document.createElement('td');
        let remove = document.createElement('button');
        remove.setAttribute('onclick', `removeTask(${t.id})`);
        remove.setAttribute('class', 'remove-button');
        remove.innerHTML = `remove`;
        tdRemove.appendChild(remove);

        tableRow.appendChild(tdName);
        tableRow.appendChild(tdPriority);
        tableRow.appendChild(tdStatus);
        tableRow.appendChild(tdRemove);

        // Adding Table Row to Table body
        tableBody.appendChild(tableRow);
    })
}

function removeTask(id) {
    let index = tasks.findIndex((obj) => obj.id === id);

    // Adding into Deleted Tasks
    deletedTasks.push(tasks[index]);
    localStorage.setItem('dtask', JSON.stringify(deletedTasks));

    // Removing from Tasks
    tasks.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(tasks));

    displayTask();
}

function changePriority(id) {
    let index = tasks.findIndex((obj) => obj.id === id);

    if (tasks[index].status === 'pending') {
        tasks[index].status = 'in-progress';
    } else if (tasks[index].status === 'in-progress') {
        tasks[index].status = 'complete';
    } else if (tasks[index].status === 'complete') {
        tasks[index].status = 'pending';
    }

    // Updating Tasks Array
    localStorage.setItem('task', JSON.stringify(tasks));

    displayTask();
}


// Initial Display
displayTask();

// Event
window.addEventListener('storage', function(event) {
    if (event.key === 'task') {
        tasks = JSON.parse(event.newValue);
        displayTask();
    }
})