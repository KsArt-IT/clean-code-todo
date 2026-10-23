const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  listItem.appendChild(checkbox);

  const label = document.createElement('label');
  label.innerText = taskText;
  label.className = 'task';
  listItem.appendChild(label);

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  listItem.appendChild(editInput);

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  listItem.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';
  deleteIcon.alt = 'Delete';
  deleteButton.appendChild(deleteIcon);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  //TODO: prevent creation of empty tasks.
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('edit-mode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }
  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  listItem.remove();
};

const toggleTaskCompletion = function () {
  const listItem = this.parentNode;
  if (this.checked) {
    completedTaskList.appendChild(listItem);
  } else {
    incompleteTaskList.appendChild(listItem);
  }
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskCompletion;
};

const bindTaskEventsInList = function (list) {
  for (const listItem of list.children) {
    bindTaskEvents(listItem);
  }
};

bindTaskEventsInList(incompleteTaskList);
bindTaskEventsInList(completedTaskList);
