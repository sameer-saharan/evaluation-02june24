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
        tdPriority.innerHTML = `${t.priority}`;

        let tdStatus = document.createElement('td');
        tdStatus.innerHTML = `${t.status}`

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

// Initial Display
displayDeletedTask();