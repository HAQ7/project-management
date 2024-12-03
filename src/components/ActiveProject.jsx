import {useContext, useRef, useState} from "react";
import Modal from "./Modal.jsx";
import Button from "./UI/Button.jsx";
import {ThemeContext} from "../store/ThemeContext.jsx";
import Alert from "./Alert.jsx";

export default function ActiveProject({
  project,
  onAddTask,
  onRemoveTask,
  onProjectRemove,
  hasLeftProject,
  setAlert,
  alert,
  setAlertType,
  alertType,
  setMessage,
  message,
  setSuccess,
  success,
}) {
  const { name, description, date, savedTasks } = project;
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [hasDeletedProject, setHasDeletedProject] = useState(false);
  const taskInput = useRef();
  const modal = useRef();
  const taskListSize = savedTasks.length > 0 ? savedTasks.length * 32 : 32
  const addTask = () => {
    if (taskInput.current.value.length < 1) {
      setIsInputEmpty(true);
      setAlert(true);
      setMessage("please type at least one character");
      setAlertType("error");
      setTimeout(() => {
        setAlert(false);
      }, 2000);
      return;
    }
    onAddTask(taskInput.current.value);
    taskInput.current.value = "";
    setIsInputEmpty(false);
    setSuccess(true);
    setAlert(true);
    setAlertType("success")
    setMessage("Task added successfully!");
    setTimeout(() => {
      setAlert(false);
      setSuccess(false);
    }, 2000);
  };

  const deleteProject = () => {
    setHasDeletedProject(true);
    setSuccess(true);
    setAlert(true);
    setAlertType("success")
    setMessage("Project deleted successfully");
    setTimeout(() => {
      setAlert(false);
      setSuccess(false);
    }, 2000);
    setTimeout(() => {
      onProjectRemove();
      setHasDeletedProject(false);
    }, 300);
  };

  return (
    <>
    {alert && <Alert message={message} type={alertType}
    className="absolute lg:bottom-4 lg:left-4 top-0 z-50"
    ></Alert>}
      <section
        className={`max-w-screen-sm w-screen ${useContext(ThemeContext).theme == 'light' ? "bg-white text-black" : "bg-[#202731] text-white" } ps-5 pe-5 pb-5 rounded-b-3xl shadow relative animate-topMoveDown duration-300 transition-all overflow-hidden ${
          hasDeletedProject || hasLeftProject ? "-translate-y-full" : ""
        }`}
      >
        <Button
          isSmall={true}
          onClick={() => {
            modal.current.openModal();
          }}
          className={`m-2 absolute right-0 text-xs`}
          bgColor={`black`}
        >
          Delete Project
        </Button>
        <h1 className={`font-bold text-4xl mt-[60px]`}>
          {name}{" "}
          <img
            className={`w-[20px] inline`}
            src={`./${useContext(ThemeContext).theme == 'light' ? "project.svg" : "project-white.svg" }`}
            alt=""
          />
        </h1>
        <p className={`text-gray-400`}>{date}</p>
        <p className={`font-medium`}>{description}</p>
      </section>
      <div
        className={`max-w-screen-sm w-screen shadow rounded-3xl ${useContext(ThemeContext).theme == 'light' ? "bg-white text-black" : "bg-[#202731] text-white" } p-2 gap-1 flex justify-between animate-bottomMoveUp duration-300 transition-all ${
          hasDeletedProject || hasLeftProject ? "translate-y-[100vh]" : ""
        }`}
      >
        <input
          ref={taskInput}
          className={`${useContext(ThemeContext).theme == 'light' ? "bg-gray-200" : "bg-[#181F25] " } outline-0 h-14 w-full max-w-sm rounded-3xl p-2 duration-300 shadow-3xl ${
            isInputEmpty ? `border border-red-700 animate-shake` : ""
          }`}
          type="text"
          placeholder={`Insert task name`}
        />
        <Button onClick={addTask} className="rounded-3xl">
          <p>Create Task</p>
        </Button>
      </div>
      <section
        className={`max-w-screen-sm  w-screen shadow rounded-3xl ${useContext(ThemeContext).theme == 'light' ? "bg-white text-black" : "bg-[#202731] text-white" } p-5 animate-bottomMoveUp duration-300 transition-all ${
          hasDeletedProject || hasLeftProject ? "translate-y-[100vh]" : ""
        }`}
      >
        <h1 className={`font-bold text-4xl`}>
          Tasks{" "}
          <img
            className={`w-[20px] inline`}
            src={`./${useContext(ThemeContext).theme == 'light' ? "list.svg" : "list-white.svg" }`}
            alt=""
          />
        </h1>
        <ul className={`m-2 max-h-52 ${taskListSize < 208 ? `overflow-y-hidden` : `overflow-y-auto`} overflow-x-hidden transition-all duration-300`} style={{
          height: `${taskListSize}px`
        }}>
          {savedTasks.length === 0 && <h1>You have not added any tasks...</h1>}
          {savedTasks.map((task, index) => (
            <li className={`relative opacity-0 animate-opacityWithDelay mt-2 flex flex-row justify-between`} key={index}>
              <span className={'overflow-hidden'}>{task}</span>
              <span
                onClick={() => onRemoveTask(index)}
                className="cursor-pointer font-bold"
              >
                Clear
              </span>
            </li>
          ))}
        </ul>
      </section>
      <Modal ref={modal} onConfirmDelete={deleteProject} />
    </>
  );
}
