import { useRef, useState } from "react";
import Modal from "./Modal.jsx";
import Button from "./UI/Button.jsx";

export default function ActiveProject({
  project,
  onAddTask,
  onRemoveTask,
  onProjectRemove,
  hasLeftProject,
}) {
  const { name, description, date, savedTasks } = project;
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [hasDeletedProject, setHasDeletedProject] = useState(false);
  const taskInput = useRef();
  const modal = useRef();

  const addTask = () => {
    if (taskInput.current.value.length < 1) {
      setIsInputEmpty(true);
      return;
    }
    onAddTask(taskInput.current.value);
    taskInput.current.value = "";
    setIsInputEmpty(false);
  };

  const deleteProject = () => {
    setHasDeletedProject(true);
    setTimeout(() => {
      onProjectRemove();
      setHasDeletedProject(false);
    }, 300);
  };

  return (
    <>
      <section
        className={`max-w-screen-sm w-screen bg-white ps-5 pe-5 pb-5 rounded-b-3xl shadow relative animate-topMoveDown duration-[0.25s] transition-all ${
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
            src="./src/assets/project.svg"
            alt=""
          />
        </h1>
        <p className={`text-gray-400`}>{date}</p>
        <p className={`font-medium`}>{description}</p>
      </section>
      <div
        className={`max-w-screen-sm w-screen shadow rounded-3xl bg-white p-2 gap-1 flex justify-between animate-bottomMoveUp duration-[0.25s] transition-all ${
          hasDeletedProject || hasLeftProject ? "translate-y-[100vh]" : ""
        }`}
      >
        <input
          ref={taskInput}
          className={`bg-gray-200 outline-0 h-14 w-full max-w-sm rounded-3xl p-2 shadow-3xl ${
            isInputEmpty ? `border border-red-700 animate-shake` : ""
          }`}
          type="text"
          placeholder={`Insert task name`}
        />
        <Button onClick={addTask} className="rounded-3xl p-1">
          <p>Create Task</p>
        </Button>
      </div>
      <section
        className={`max-w-screen-sm  w-screen shadow rounded-3xl bg-white p-5 animate-bottomMoveUp duration-[0.25s] transition-all ${
          hasDeletedProject || hasLeftProject ? "translate-y-[100vh]" : ""
        }`}
      >
        <h1 className={`font-bold text-4xl`}>
          Tasks{" "}
          <img
            className={`w-[20px] inline`}
            src="./src/assets/list.svg"
            alt=""
          />
        </h1>
        <ul className={`p-2 max-h-52 overflow-y-auto overflow-x-hidden `}>
          {savedTasks.length === 0 && <h1>You have not added any tasks...</h1>}
          {savedTasks.map((task, index) => (
            <li className={"relative animate-opacity mt-2"} key={index}>
              {task}{" "}
              <span
                onClick={() => onRemoveTask(index)}
                className="w-[20px] me-4 cursor-pointer inline absolute right-0 font-bold"
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
