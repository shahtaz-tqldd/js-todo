const inputBox = document.getElementById("input-box");
const taskContainer = document.getElementById("task-container");

const addTask = () => {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let span = document.createElement("span");
    span.innerHTML = '<i class="fas fa-x"></i>';
    li.appendChild(span);

    taskContainer.insertBefore(li, taskContainer.firstChild);
  }
  inputBox.value = "";
  saveData();
};

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    addTask();
  }
};

taskContainer.addEventListener(
  "click",
  (e) => {
    const clickedElement = e.target;

    if (clickedElement.tagName === "LI") {
      clickedElement.classList.toggle("checked");
      saveData();
    } else if (clickedElement.tagName === "SPAN") {
      clickedElement.parentElement.remove();
      saveData();
    } else if (clickedElement.tagName === "I") {
      const listItem = clickedElement.closest("li");
      if (listItem) {
        listItem.remove();
        saveData();
      }
    }
  },
  false
);


const saveData = () => {
  localStorage.setItem("data", taskContainer.innerHTML);

  if (taskContainer.childElementCount === 0) {
    let noItemMessage = document.createElement("h3");
    noItemMessage.innerText = "No items in your list!";
    taskContainer.appendChild(noItemMessage);
  } else {
    const noItemsMessage = taskContainer.querySelector("h3");
    if (noItemsMessage) {
      noItemsMessage.remove();
    }
  }
};

const showData = () => {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    taskContainer.innerHTML = savedData;
  } else {
    let noItemMessage = document.createElement("h3");
    noItemMessage.innerText = "No items in your list!";
    taskContainer.appendChild(noItemMessage);
  }
};

showData();
