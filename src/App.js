import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New repository ${Date.now()}`,
      techs: ['Java', 'Elixir'],
      url: 'http://www.google.com'
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      setRepositories(repositories.filter((repository) => repository.id !== id));
    }); 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository =>
          <li key={repository.id}>
            <span>{repository.title}</span>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
