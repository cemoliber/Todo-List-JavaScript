const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body");
const filter = document.querySelector("filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener(){//All event listeners
    form.addEventListener("submit",addTodo);
}

function addTodo(e){

    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("danger","Please type a Todo!");
        /*
        <div class="alert alert-danger" role="alert">
                        This is a danger alert—check it out!
                      </div>
                    <hr>*/
    }else{
        addTodoUI(newTodo);
        showAlert("success","Todo added successfuly");
    } 

    e.preventDefault();
}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    //setTimeout
    setTimeout(function(){
        alert.remove();
    },1500);

}
function addTodoUI(newTodo){
    //Creating list item
    const listItem = document.createElement("li");
    
    //Creating link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    //Text Note
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Adding List Item to Todo List
    todoList.appendChild(listItem);

    todoInput.value = "";
}