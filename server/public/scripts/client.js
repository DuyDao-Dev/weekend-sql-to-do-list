console.log('Client.js is ready');

$(document).ready(onReady);

function onReady(){
  //add listeners
    $('#addTaskButton').on('click', postTask);
    getTask();
};

function postTask (){
    let taskToSend = {
        task: $('#taskInput').val(),
        date: $('#dateInput').val(),
        complete: false,
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
        $('#list-items').append(`
        <li><input class='checkbox' type='checkbox' /> 
        <span class='todo-text'>${tasks.task}</span>
        <span class='todo-text'>${tasks.date}</span>
        <span class='todo-text'>${tasks.complete}</span>
        <span class='todo-text'>${tasks.notes}</span>
        <a class='remove text-right'><i class='fa fa-trash'></i></a><hr>
        </li>
        `)
    }
};