const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

app.use(cors());

app.use(middleware);

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  if (title && url && techs) {
    const likes = 0;

    const repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes,
    };
    
    repositories.push(repository);
    
    return response.status(201).json(repository);
  }

  return response.status(422).json({ error: "Required parameters are missing." });
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request. body
  
  const repository = repositories.findIndex(repo => repo.id == id);

  if (repository >= 0) {
    if (title && url && techs) {
      repositories[repository].title = title;
      repositories[repository].url = url;
      repositories[repository].techs = techs;

      const actualizedRepository = repositories.find(repo => repo.id == id);

      return response.status(200).json(actualizedRepository);
    } else {
        const actualizedRepository = repositories.find(repo => repo.id == id);
        
        return response.status(200).json(actualizedRepository);
    }
  } else {
      return response.status(400).json({ error: "Project not found." });
  }

  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repository = repositories.findIndex(repo => repo.id == id );

  if (repository >= 0) {

    repositories.splice(repository, 1);

    return response.sendStatus(204);
  } 
  
  return response.status(400).json({ error: "Project not found." });

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repository = repositories.findIndex(repo => repo.id == id);

  if (repository >= 0) {
    const { likes } = repositories[repository];
    
    repositories[repository].likes = likes + 1;
    
    const actualizedRepository = repositories.find(repo => repo.id == id);

    return response.status(200).json({ likes: actualizedRepository.likes});
  } else {
      return response.status(400).json({ error: "Project not found." });
  }
});

module.exports = app;
