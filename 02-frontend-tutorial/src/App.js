import React, {useState,useEffect} from "react";
import api from './services/api';

import Header from "./components/Header"
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('http://localhost:3333/projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject(){
    const response = await api.post('http://localhost:3333/projects', {
      title: `Projeto ${Date.now()}`,
      owner: 'Renato'
    });
    const project = response.data;

    setProjects([...projects, project]);
  };
  console.log(projects)

  return (
  <>
    
    <Header title="Projects" />
    <button type="button" onClick={handleAddProject}>+</button>
    <ul>
      {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>
  </>
  );

};

export default App;