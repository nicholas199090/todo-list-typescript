import {v4 as uuidV4} from "uuid"

let list = document.querySelector <HTMLUListElement> ('#list')
let taskForm = document.querySelector <HTMLFormElement> ('#new-task-form')
let tasktitle = document.querySelector <HTMLInputElement> ('#new-task-title')

type Task = {
  id: string,
  title: string,
  completed: boolean,
  created_at: Date
}

let tasks: Task[] =  loadTasks()

tasks.forEach(addListItem)

taskForm?.addEventListener('submit', e => {
  e.preventDefault();

  if (tasktitle?.value == null || tasktitle.value == "") return
  let task = {
    id: uuidV4(),
    title: tasktitle.value,
    completed: false,
    created_at: new Date()
  }
  tasks.push(task)
  addListItem(task)
  tasktitle.value = "";
})

function addListItem(task: Task) {
  const item = document.createElement('li');
  item.classList.add("item");
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  const button = document.createElement('button')
  //button.setAttribute('button-id',task.id)
  button.classList.add("remove")
  button.textContent = "X";
  checkbox.addEventListener("change", () =>{
    task.completed = checkbox.checked
    saveTasks();
  })
 
  checkbox.type = "checkbox";
  checkbox.checked = task.completed
  label.append(checkbox,task.title);
  item.append(label);
  item.append(button)
  list?.append(item)
  button.addEventListener('click',() =>{
    let taskID = task.id;
    removeListItem(taskID)
    saveTasks()
    item.remove()
  })
  saveTasks();
}

function removeListItem(itemId: string){
  tasks = tasks.filter(data => data.id != itemId);
  
}

function saveTasks(){
  localStorage.setItem("TASK",JSON.stringify(tasks));
}

function loadTasks(): Task[]{
  let taskJSON = localStorage.getItem('TASK');
  if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}