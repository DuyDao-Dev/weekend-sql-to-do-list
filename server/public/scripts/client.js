console.log('Client.js is ready');

$(document).ready(onReady);

function onReady(){
  //add listeners
    $('#addTaskButton').on('click', getTask);
};

function getTask (){
    let taskToSend = {
        task: $('#taskInput').val(),
        date: $('#dateInput').val(),
        complete: ("#checkBoxComplete").val(),//create on GET append
        notes: $('#notesInput').val()
    };
    console.log('Posting to server', taskToSend);

    $.ajax({
        method: 'POST',
        url: "/tododata",
        data: taskToSend
    }).then((response) => {
        console.log(reponse);
        //getTasks();
    }).catch((error) => {
        console.log(`Error when posting task`, error);
        alert(`Erroring adding task. Please try again.`);
    });
}