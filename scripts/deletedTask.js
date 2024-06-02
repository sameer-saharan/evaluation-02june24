// Local Storage Initialization
let tasks = JSON.parse(localStorage.getItem('task'));
let deletedTasks = JSON.parse(localStorage.getItem('dtask'));

// Table Body
let tableBody = document.querySelector('.tableBody');

function clearDeletedTable() {
    tableBody.innerHTML = ``;
}

function displayDeletedTask() {
    clearDeletedTable();
    deletedTasks.forEach((t) => {
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
        statusBtn.setAttribute('onclick', `changePriorityX(${t.id})`);
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

        let tdRestore = document.createElement('td');
        let restore = document.createElement('button');
        restore.setAttribute('onclick', `restoreTask(${t.id})`);
        restore.setAttribute('class', 'restore-button');
        restore.innerHTML = `restore`;
        tdRestore.appendChild(restore);

        let tdDelete = document.createElement('td');
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('onclick', `deleteTaskPerm(${t.id})`);
        deleteBtn.setAttribute('class', 'delete-button');
        deleteBtn.innerHTML = `delete`;
        tdDelete.appendChild(deleteBtn);

        tableRow.appendChild(tdName);
        tableRow.appendChild(tdPriority);
        tableRow.appendChild(tdStatus);
        tableRow.appendChild(tdRestore);
        tableRow.appendChild(tdDelete);

        // Adding Table Row to Table body
        tableBody.appendChild(tableRow);
    })
}

function restoreTask(id) {
    let index = deletedTasks.findIndex((obj) => obj.id === id);

    // Adding to Tasks array
    tasks.push(deletedTasks[index]);
    localStorage.setItem('task', JSON.stringify(tasks));
    

    // Removing from Deleted Tasks Array
    deletedTasks.splice(index, 1);
    localStorage.setItem('dtask', JSON.stringify(deletedTasks));

    displayDeletedTask();

}

function deleteTaskPerm(id) {
    let index = deletedTasks.findIndex((obj) => obj.id === id);

    // Removing Permanently
    deletedTasks.splice(index, 1);
    localStorage.setItem('dtask', JSON.stringify(deletedTasks));

    displayDeletedTask();

}

function changePriorityX(id) {
    let index = deletedTasks.findIndex((obj) => obj.id === id);

    if (deletedTasks[index].status === 'pending') {
        deletedTasks[index].status = 'in-progress';
    } else if (deletedTasks[index].status === 'in-progress') {
        deletedTasks[index].status = 'complete';
    } else if (deletedTasks[index].status === 'complete') {
        deletedTasks[index].status = 'pending';
    }

    // Updating Tasks Array
    localStorage.setItem('dtask', JSON.stringify(deletedTasks));

    displayDeletedTask();
}


// Initial Display
displayDeletedTask();