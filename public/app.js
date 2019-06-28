$(document).ready(function(){
  $.getJSON("/api/tasks")
  .then(addtasks)

  $("#taskInput").keypress(function(event){
    if(event.which == 13){
    createtask();
    }
  });

  $(".list").on("click", "li", function(){
    updatetask($(this))
    })

  $(".list").on("click", "span", function(e){
    e.stopPropagation();
    removetask($(this).parent());
  })
});

function addtasks(tasks) {
  tasks.forEach(function(task){
    addtask(task);
  });
}
  
function addtask(task){
  var newtask = $('<li class="task">'+task.name +' <span>X</span></li>');
  newtask.data("id", task._id);
  newtask.data("completed", task.completed)
  if(task.completed){
    newtask.addClass("done");
  }
  $('.list').append(newtask);
}


function createtask(){
  var userinput = $("#taskInput").val();
  $.post("/api/tasks",{name: userinput})
  .then(function(newtask){
    $("#taskInput").val(' ');
    addtask(newtask);
  })
  .catch(function(err){
      console.log(err);
  })
}

function removetask(task){
  var clickedId = task.data("id");
  var deleteUrl = "/api/tasks/" + clickedId;
  $.ajax({
    method: "delete",
    url: deleteUrl
  })
  .then(function(data){
    task.remove();
  })
  .catch(function(err){
    console.log(err);
  })
}

function updatetask(task){
  var updateUrl = "/api/tasks/" + task.data("id");
  var isDone = !task.data("completed");
  var updateData = {completed: isDone}
  $.ajax({
    method: "put",
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedtask){
    task.toggleClass("done");
    task.data("completed", isDone);
    })
}