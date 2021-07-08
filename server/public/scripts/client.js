console.log('Client.js is ready');

$(document).ready(onReady);

function onReady(){
  //add listeners
    $('#addTaskButton').on('click', postTask);
    $('#list-items').on('click', '.deleteTask', deleteTaskHandler);
    $( '.completeButton').on('click', updateTaskHandler)
    getTask();
    $('#list-items').on('click', '.completeButton', updateTaskHandler);
};

function postTask (){
    let taskToSend = {
        task: $('#taskInput').val(),
        date: $('#dateInput').val(),
        complete: 'Not Complete', 
        notes: $('#notesInput').val()
    };
    console.log('Posting to server', taskToSend);

    $.ajax({
        method: 'POST',
        url: "/todolist",
        data: taskToSend
    }).then((response) => {
        console.log(response);
        getTask();
    }).catch((error) => {
        console.log(`Error when posting task`, error);
        alert(`Erroring adding task. Please try again.`);
    });
}

function getTask () {
    $.ajax({
        method: 'GET',
        url: '/todolist'
    }).then((response) => {
        renderTasks(response);
    }).catch((error) => {
        console.log(`Error when GETting`, error);
    });
};


function renderTasks(listOfTasks){
    $('#list-items').empty();
        for (let tasks of listOfTasks) {
        let taskComplete = (tasks.complete ? 'Not Complete' : 'Complete');
        console.log(tasks.complete);
         $("#list-items").append(`
        <li class="returnTasks" data-id="${tasks.id}">
        <span class='todo-text'>${tasks.task}</span>
        <span class='todo-text'>${tasks.date}</span>
        <span class='todo-text'>${tasks.notes}</span>
        <td><button class="completeButton" data-id=${tasks.id} data-status=${tasks.complete}>${taskComplete}</button></td>
        <td><button class="deleteTask" data-id=${tasks.id}>Delete</button></td>
        <a class='remove text-right'><i class='fa fa-trash'></i></a><hr>
        </li>
        `);
    }
};



//Update task with PUT
function updateTaskHandler(){
    updateTask($(this).data());
    console.log($(this).data());
}

function updateTask(taskData){
  console.log('Task is ready to update', taskData.status , !taskData.status);
  console.log(taskData);
    $.ajax({
        method: 'PUT',
        url: `/todolist/${taskData.id}`, 
        data: {
            complete: !taskData.status,
        }
    }).then(response => {
    console.log(`Task status updated`, response);
    getTask();
    }).catch(error => {
    console.log(`Task status NOT updated`, error);
    });
}


// DELETE
function deleteTaskHandler() {
  deleteTask($(this).data('id'));
} 

function deleteTask(taskId){
    $.ajax({
    method: 'DELETE',
    url: `/todolist/${taskId}`, //correct url?
  })
  .then(response => {
    console.log(`Task status updated`, response);
    getTask();
  })
  .catch(error => {
    console.log(`Task status NOT updated`, error);
  });
};

// function prettyDate(unformattedDate) {
//     const dateString = new Date(unformattedDate);
//     const year = dateString.getFullYear();
//     let month = (1 + dateString.getMonth()).toString() ;
//     let day = dateString.getDate().toString();
//     month = month.length === 1 ? '0' + month : month;
//     day = day.length === 1 ? '0' + day : day;
//     return month + '-' + day + '-' + year;
// } //end prettyDate. Need to figure out how to 
//implement this to remove time stamp.