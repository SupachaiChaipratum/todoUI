var url ="http://localhost:8080";
$( document ).ready(function() {
     $("#add-todo-item").on('click', function(e){
     e.preventDefault();
     addTodoItem()
   });
  

//   $("#todo-list").on('click', '.todo-item-delete', function(e){
//     var item = this; 
//     deleteTodoItem(e, item)
//   })
  
  $(document).on('click', ".todo-item-done", completeTodoItem)


  getAllTodoList();
});

function addTodoItem() {
  var todoItem = $("#new-todo-item").val();
  $.ajax({
            url: url+'/task',
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            data:'{"description" : "'+todoItem+'", "pending" : "true" }',
            success: function (data) {

                getAllTodoList();
            },
            
        });


  
 $("#new-todo-item").val("");
}

function deleteTodoItem(e, id,item) {
    
  e.preventDefault();
    $.ajax({
            url: url+'/task/'+id,
            type: 'DELETE',
            contentType: "application/json",
            success: function (data) {

                 $(item).parent().parent().fadeOut('slow', function() { 
                        $(item).parent().parent().remove();
                });
            },
            
    });


 
}

                           
function completeTodoItem() {  
 $.ajax({
            url: url+'/task/'+$(this).val(),
            type: 'PUT',
            contentType: "application/json",
            success: function (data) {

                getAllTodoList();
            },
            
        });
}

function clickEdit(e,id){
    e.preventDefault();

    $("#task-edit-"+id).show();
     $("#task-show-"+id).hide();
}


function clickUpdate(e,id,item){
    e.preventDefault();

    $.ajax({
            url: url+'/task',
            type: 'PATCH',
            contentType: "application/json",
            dataType: 'json',
            data:'{"id" : "'+id+'" ,"description" : "'+$("#input-task-"+id).val()+'", "pending" : "'+ !($(item).parent().parent().hasClass("strike"))+'" }',
            success: function (data) {

                getAllTodoList();
            },
            
        });
    
}

function getAllTodoList(){
    $("#todo-list").text("")
    $.ajax({
            url: url+'/tasks',
            type: 'get',
             dataType: 'json',
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                    var className = "";
                    var checked ="";
                    if(!data[i].pending){
                        className="strike"
                        checked = "checked"
                    }

                    $("#todo-list").append("<li class= '"+ className+"' >"+         
                        "<span id='task-show-"+data[i].id+"'>"+ 
                        " <input type='checkbox'" + 
                        " name='todo-item-done'" + 
                        " class='todo-item-done'"+ 
                        " value='" + data[i].id + "' "+checked+" /> " + 
                            data[i].description +
                         " <button class='todo-item-edit'  onclick='clickEdit(event,"+data[i].id+")'>"+
                         "Edit</button>"+
                          " <button class='todo-item-delete' onclick='deleteTodoItem(event,"+data[i].id+",this)'>"+
                         "Delete</button>"+
                        "</span>"+   

                        "<span id='task-edit-"+data[i].id+"' style='display:none'>"+ 
                        " <input type='text'  id='input-task-"+data[i].id+"'" + 
                        " name='todo-item-edit'" + 
                        " class='todo-item-edit'"+ 
                        " value='" +data[i].description+ "' /> "+
                         " <button class='todo-item-update'  onclick='clickUpdate(event,"+data[i].id+",this)'>"+
                         "Update</button>"+
                        " </span></li>"
                        

                       

                        );
                }
            },
            
        });
}


