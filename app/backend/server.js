const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

// GET - listar tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST - criar tarefa
app.post('/tasks', (req, res) => {
  const task = {
    id: id++,
    titulo: req.body.titulo,
    concluida: false
  };
  tasks.push(task);
  res.json(task);
});

// PUT - atualizar tarefa
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.concluida = req.body.concluida;
    res.json(task);
  } else {
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }
});

// DELETE - excluir tarefa
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ mensagem: "Removido" });
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});