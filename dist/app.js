

//------------  GLOBAL ---------------//


// DOM Selections
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// function - load event listeners
function loadEventListeners() {

    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    //add task event
    form.addEventListener("submit", addTask);
    
    //remove task event
    taskList.addEventListener('click', removeTask);
    
    // clear all tasks event
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks event
    filter.addEventListener('keyup', filterTasks);

}







//----------- FUNCTIONS--------------//

//GET TASKS FROM LOCAL STORAGE
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement("li");
        //add a class
        li.className = "collection-item";
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element (X to close/delete li)
        const link = document.createElement('a');
        //add class to link
        link.className = 'delete-item secondary-content';
        //add icon to html
        link.innerHTML = '<i class="fa fa-times"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    });

}



// ADD TASK
function addTask(e) {
    if(taskInput.value === '') {
        alert("Add a Task");
    }

    // create li element
    const li = document.createElement("li");
    //add a class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element (X to close/delete li)
    const link = document.createElement('a');
    //add class to link
    link.className = 'delete-item secondary-content';
    //add icon to html
    link.innerHTML = '<i class="fa fa-times"></i>';
    //append link to li
    li.appendChild(link);
    
    //append li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //clear task input field
    taskInput.value = "";

    e.preventDefault();
}


// REMOVE TASK
function removeTask (e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();

        //Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}

//Remove From Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// CLEAR TASKS
function clearTasks() {
    if(confirm("Are you sure for sure?")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }

    clearTasksFromLocalStorage();
}

//CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLocalStorage() {
    localStorage.clear();
}



//FILTER TASKS
function filterTasks(e){
    //watch filter input value
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

    
}

//Store tasks in Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task); 

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

