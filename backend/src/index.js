const express = require('express');
const {uuid} = require('uuidv4');

const app = express();

app.use(express.json());



const projects = [];


function logRequest(request, response, next){

    const {method, url} = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();


};

app.use(logRequest);






app.get('/',(request,response) => {
    return response.send('Página inicial');
});


app.get('/projects',(request,response) => {

    // Query Params
    const {title} = request.query;

    const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

    if (title) console.log(title);

    // title ? console.log(title) : '';

    return response.json(results);
});

app.post('/projects',(request,response) =>{

    const {title,owner} = request.body;
    console.log(title);
    console.log(owner);


    const project = {id: uuid(), title, owner};

    projects.push(project);


    return response.json(project);
});

app.put('/projects/:id',(request,response) =>{

    const {id} = request.params;
    const {title,owner} = request.body;
    console.log(title);
    console.log(owner);
    console.log(id);

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({"error":"Projeto nao encontrado"});
    }

    const project = {id,title,owner};

    projects[projectIndex] = project;

    return response.json( project );
});

app.delete('/projects/:id',(request,response) =>{
    
    const {id} = request.params;
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({"error":"Projeto nao encontrado"});
    }

    projects.splice(projectIndex,1);
    
    return response.status(204).send();
});




app.listen(3333, () => {
    console.log('Back-end iniciado ✔')
});
