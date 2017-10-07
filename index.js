var url ="http://localhost:8080";
$( document ).ready(function() {
     $("#add-todo-item").on('click', function(e){
     e.preventDefault();
     addTodoItem()
   });
  

  $("#todo-list").on('click', '.todo-item-delete', function(e){
    var item = this; 
    deleteTodoItem(e, item)
  })
  
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

function deleteTodoItem(e, item) {
    
  e.preventDefault();
    $.ajax({
            url: url+'/task/'+$(item).prev().val(),
            type: 'DELETE',
            contentType: "application/json",
            success: function (data) {

                 $(item).parent().fadeOut('slow', function() { 
                        $(item).parent().remove();
                });
            },
            
    });


 
}

                           
function completeTodoItem() {  
 // 
 


 $.ajax({
            url: url+'/task/'+$(this).val(),
            type: 'PUT',
            contentType: "application/json",
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
                        "<input type='checkbox'" + 
                         " name='todo-item-done'" + 
                         " class='todo-item-done'"+ 
                         " value='" + data[i].id + "' "+checked+" /> " + 
                            data[i].description +
                         " <button class='todo-item-delete'>"+
                         "Delete</button></li>");
                }
            },
            
        });
}


