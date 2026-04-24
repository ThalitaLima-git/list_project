const api = 'http://localhost:3000/tasks';

async function loadTasks() {
  const res = await fetch(api);
  const tasks = await res.json();

  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');

    li.innerHTML = `
      ${task.titulo} 
      [${task.concluida ? "✔" : "❌"}]
      <button onclick="toggleTask(${task.id}, ${task.concluida})">Concluir</button>
      <button onclick="deleteTask(${task.id})">Excluir</button>
    `;

    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('inputTask');

  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: input.value })
  });

  input.value = '';
  loadTasks();
}

async function toggleTask(id, status) {
  await fetch(`${api}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ concluida: !status })
  });

  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${api}/${id}`, {
    method: 'DELETE'
  });

  loadTasks();
}

loadTasks();