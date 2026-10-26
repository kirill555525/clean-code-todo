const newTaskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  return deleteButton;
};

const createTaskItem = function (taskText) {
  const taskItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.innerText = taskText;
  label.className = 'task';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  taskItem.append(checkbox, label, editInput, editButton, createDeleteButton());

  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskItem(newTaskInput.value);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = '';
};

const editTask = function (event) {
  const taskItem = event.currentTarget.parentElement;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function (event) {
  const taskItem = event.currentTarget.parentElement;
  const taskList = taskItem.parentNode;

  taskList.removeChild(taskItem);
};

const toggleTaskStatus = function (event) {
  const checkbox = event.currentTarget;
  const taskItem = checkbox.parentElement;
  const destinationList = checkbox.checked ? completedList : todoList;

  destinationList.appendChild(taskItem);
};

const bindTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);

  deleteButton.addEventListener('click', deleteTask);

  checkbox.addEventListener('change', toggleTaskStatus);
};

addButton.addEventListener('click', addTask);

for (const taskItem of [...todoList.children, ...completedList.children]) {
  bindTaskEvents(taskItem);
}
