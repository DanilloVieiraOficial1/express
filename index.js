const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

// Middleware que verifica se o projeto existe
function checkProjectExists(req, res, next){
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
    if(!project){
        return res.status(400).json({error: 'Project not fount'});
    }
    return next();
};
// Cadastrar um novo projeto
server.post('/projects',(req,res) =>{
    const {id, tittle} = req.body;
    const project = {
        id,
        tittle,
        tasks: []
    };
    projects .push(project);
    return res.json(project);
});

// Adiciona uma nova tarefa ao projeto escolhido via ID 
server.post('/projects/:id/tasks', checkProjectExists, (req,res)=>{
    const { id } = req.params;
    const { tittle } = req.body;
    const project = projects.find(p => p.id == id);
    project.tasks.push(tittle);
    return res.json(project);

});



// Retorna todos os projetos cadastrados
server.get('/projects',(req,res) => {
    return res.json(projects);
});

// Altera o título do projeto com o id presente nos parametros da rota
server.put('/projects/:id',checkProjectExists, (req,res) =>{
    const { id } = req.params;
    const { tittle } = req.body;
    const project = projects.find(p => p.id == id);
    project.tittle = tittle;
    return res.json(project);
} );


// Apaga o projeto associado ao id presente nos paramatros da rota
server.delete('/projects/:id',checkProjectExists, (req,res) =>{

});

server.listen(3333);