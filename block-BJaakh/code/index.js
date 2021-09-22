let baseUrl = "https://sleepy-falls-37563.herokuapp.com/api/todo";
let rootElm = document.querySelector(".todo-list");
let inputElm = document.querySelector(".add-todo");
inputElm.addEventListener("keyup", handleInput);

function fetchData() {
  fetch(baseUrl)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      displayUi(result);
    });
}
fetchData(); 

function handleInput(event) {
  //event.preventDefault();
  let data = {};
  if (event.keyCode == "13") {
    
    data.todo = {
      title: event.target.value,
      isCompleted: false,
    };
    postData(data);
    fetchData();
    event.target.value = "";
  }
}

function displayUi(result) {
  rootElm.innerHTML = "";
  console.log(result);
  result.todos.forEach((element) => {
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "task";
    input.checked = element.isCompleted;
    input.addEventListener("click", ()=>{
      handleCheckbox(element)
    });
    let p = document.createElement("p");
    p.innerText = element.title;
    p.contentEditable = true;
    p.addEventListener("input", (event)=>{handleTitle(event, element)}
      
    );
    let span = document.createElement("span");
    span.innerText = "X";
    span.addEventListener("click", () => {
      handleDelete(element);
    });
    li.append(input, p, span);
    rootElm.append(li);
  });
}

function handleTitle(event, element){
  let data= {};
  data.todo = {
    title: event.target.innerText,
  };
  fetch(baseUrl + `/${element._id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    }, // body data type must match "Content-Type" header
    body: JSON.stringify(data),
  }).then(res=>res.json()).then((data)=> {
    fetchData()
    })
}

function postData(data) {
  fetch(baseUrl, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(res=>res.json()).then((data)=> {
  fetchData()
  })
}
function handleDelete(element) {
  console.log(element);
  fetch(baseUrl + `/${element._id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    }, // body data type must match "Content-Type" header
  }).then(res=>res.json()).then((data)=> {
    fetchData()
    })
}

function handleCheckbox(element) {
  let data= {};
  data.todo = {
    isCompleted: !element.isCompleted,
  };
  element.isCompleted = !element.isCompleted;
  fetch(baseUrl + `/${element._id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    }, // body data type must match "Content-Type" header
    body: JSON.stringify(data),
  }).then(res=>res.json()).then((data)=> {
    fetchData()
})
}
