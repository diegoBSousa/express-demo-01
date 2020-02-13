const express = require('express');

const server = express();

server.use(express.json());

const projectList = [];

var resquestTotal = 0;

/** Middlewares */
function checkId(req, res, next)
{
  const { id } = req.params;

  if(!projectList[id]){
    return res.status(400).json({"error": "This project does not exist."});
  }

  return next();
}

/** Global Middelware */
server.use((req, res, next) => {
  resquestTotal++;
  console.log(`Quantidade de Requisições: ${resquestTotal}`);
  return next();
});

/** Routes */
server.post('/projects/', (req, res) => {
  const { id, title } = req.body;

  projectList[id] = {
    id,
    title,
    "tasks": []
  };

  return res.json({
    id,
    title
  });
});

server.get('/projects/', (req, res) => {
  return res.json(projectList);
});

server.put('/projects/:id/', checkId, (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  projectList[id] = {
    id,
    title,
    "tasks":[]
  };

  return res.json(projectList[id]);
});

server.delete('/projects/:id/', checkId, (req, res) => {
  const { id } = req.params;

  projectList.splice(id, 1);

  return res.send();
});

server.post('/projects/:id/tasks/', checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projectList[id].tasks.push(title);
  
  return res.json(projectList[id]);
});

server.listen(3000);