import { useRef, useState, useContext } from "react";
import SideMenu from "./components/SideMenu.jsx";
import ActiveProject from "./components/ActiveProject.jsx";
import CreateProjectForm from "./components/CreateProjectForm.jsx";
import Button from "./components/UI/Button.jsx";
import {ThemeContext} from "./components/store/ThemeContext.jsx";


function App() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(0);
  const [hasGoneToCreate, setHasGoneToCreate] = useState(false);
  const [theme, setTheme] = useState('light')

  const projectCreateHandler = (project) => {
    setProjects((prevProjects) => {
      setActiveProject(projects.length);
      return [...prevProjects, project];
    });
  };

  const projectRemoveHandler = () => {
    projects.splice(activeProject, 1);
    setProjects((prevProjects) => {
      if (activeProject === projects.length && activeProject !== 0) {
        setActiveProject(projects.length - 1);
      }
      return [...prevProjects];
    });
  };

  const changeActiveProject = (key) => {
    setHasGoneToCreate(true);
    setTimeout(() => {
      setActiveProject(key);
      setHasGoneToCreate(false);
    }, 300);
  };

  const addTaskHandler = (task) => {
    projects[activeProject].savedTasks.push(task);
    setProjects((prevProjects) => [...prevProjects]);
  };

  const removeTaskHandler = (taskIndex) => {
    projects[activeProject].savedTasks.splice(taskIndex, 1);
    setProjects((prevProjects) => [...prevProjects]);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <section className={`${theme == 'light' ? "bg-[#dddddd]" : "bg-[#181F25]" }  w-screen h-screen transition`}>
      <SideMenu
        projects={projects}
        onProjectClick={changeActiveProject}
        onProjectCreateClick={changeActiveProject}
        onChangeTheme={() => {setTheme(() =>
          theme == 'light' ? 'dark' : 'light'
        )}}

      />
      <section className="flex flex-col justify-center items-center gap-3">
        {activeProject === -1 ? (
          <CreateProjectForm onProjectCreate={projectCreateHandler} hasLeftProject={hasGoneToCreate} />
        ) : projects.length > 0 ? (
          <ActiveProject
            onProjectRemove={projectRemoveHandler}
            onAddTask={addTaskHandler}
            onRemoveTask={removeTaskHandler}
            project={projects[activeProject]}
            hasLeftProject={hasGoneToCreate}
          />
        ) : (
          //   #202731
          <h1
            className={`font-bold mt-32 text-center ${theme == 'light' ? "bg-white text-black" : "bg-[#202731] text-white" }  shadow rounded-3xl p-2 grid place-items-center animate-bottomMoveUp duration-[0.25s] transition-all ${
              hasGoneToCreate ? "translate-y-[100vh]" : ""
            }`}
          >
            You have not added any projects yet...{" "}
            <Button
              onClick={() => changeActiveProject(-1)}
              className="p-1 mt-3"
            >
              <p>Create Project</p>
            </Button>
          </h1>
        )}
      </section>
      </section>
    </ThemeContext.Provider>
  );
}

export default App;
