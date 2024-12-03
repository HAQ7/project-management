import { useContext, useState } from "react";
import SideMenu from "./components/SideMenu.jsx";
import ActiveProject from "./components/ActiveProject.jsx";
import CreateProjectForm from "./components/CreateProjectForm.jsx";
import Button from "./components/UI/Button.jsx";
import { ThemeContextProvider, ThemeContext } from "./store/ThemeContext.jsx";
import { Background } from "./components/UI/background.jsx";
import { EmptyProject } from "./components/emptyProject.jsx";
import Alert from "./components/Alert.jsx";

const getProjectsLocal = (key) => {
  const data =
    JSON.parse(localStorage.getItem(key)) === null
      ? []
      : JSON.parse(localStorage.getItem(key));
  console.log(data);
  return data;
};

function App() {
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [projects, setProjects] = useState(getProjectsLocal("projects"));
  const [activeProject, setActiveProject] = useState(0);
  const [hasGoneToCreate, setHasGoneToCreate] = useState(false);

  const projectCreateHandler = (project) => {
    setProjects((prevProjects) => {
      setActiveProject(projects.length);
      const newProjects = [...prevProjects, project];
      localStorage.setItem("projects", JSON.stringify(newProjects));
      return newProjects;
    });
  };

  const projectRemoveHandler = () => {
    projects.splice(activeProject, 1);
    setProjects((prevProjects) => {
      if (activeProject === projects.length && activeProject !== 0) {
        setActiveProject(projects.length - 1);
      }
      localStorage.setItem("projects", JSON.stringify(prevProjects));
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
    setProjects((prevProjects) => {
      localStorage.setItem("projects", JSON.stringify(prevProjects));
      return [...prevProjects];
    });
  };

  const removeTaskHandler = (taskIndex) => {
    projects[activeProject].savedTasks.splice(taskIndex, 1);
    setSuccess(true);
    setAlert(true);
    setAlertType("success");
    setMessage("Task removed successfully!");
    setTimeout(() => {
      setAlert(false);
      setSuccess(false);
    }, 2000);
    setProjects((prevProjects) => {
      localStorage.setItem("projects", JSON.stringify(prevProjects));
      return [...prevProjects];
    });
  };

  return (
    <ThemeContextProvider>
      <Background>
        <SideMenu
          projects={projects}
          onProjectClick={changeActiveProject}
          onProjectCreateClick={changeActiveProject}
        />
        <section className="flex flex-col justify-center items-center gap-3">
          {activeProject === -1 ? (
            <CreateProjectForm
              onProjectCreate={projectCreateHandler}
              hasLeftProject={hasGoneToCreate}
            />
          ) : projects.length > 0 ? (
            <ActiveProject
              onProjectRemove={projectRemoveHandler}
              onAddTask={addTaskHandler}
              onRemoveTask={removeTaskHandler}
              project={projects[activeProject]}
              hasLeftProject={hasGoneToCreate}
              setAlert={setAlert}
              setMessage={setMessage}
              setAlertType={setAlertType}
              setSuccess={setSuccess}
              alert={alert}
              success={success}
              message={message}
              alertType={alertType}
            />
          ) : (
            //   #202731
            <EmptyProject
              hasGoneToCreate={hasGoneToCreate}
              changeActiveProject={changeActiveProject}
            />
          )}
        </section>
      </Background>
    </ThemeContextProvider>
  );
}

export default App;
