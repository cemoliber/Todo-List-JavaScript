const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener(){//All event listeners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    
    if(confirm("Do you want delete all todos?")){
        //clear from UI
        //todoList.innerHTML = ""; slowly method

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){
            //Does not include
            listItem.setAttribute("style","display : none !important");
        }else{
            listItem.setAttribute("style","display : block");
        }
    });
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo deleted successfully");
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            if(todo === deleteTodo){
                todos.splice(index,1);
            }
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoUI(todo);
    });
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
        addTodoToStorage(newTodo);
        showAlert("success","Todo added successfuly");
    } 

    e.preventDefault();
}

function getTodosFromStorage(){ //Gets Todos from Storage
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
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