import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";
function App() {
  const [repositorys, setReposotory] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("repositories");

      setReposotory(response.data);
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url:
        "https://github.com/CampossCaio/gostack-12-desafio-03-conceitos-reactjs",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setReposotory([...repositorys, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setReposotory(repositorys.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
