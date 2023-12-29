import {useContext, useRef, useState} from "react";
import Button from "./UI/Button.jsx";
import {ThemeContext} from "./store/ThemeContext.jsx";

export default function CreateProjectForm({ onProjectCreate, hasLeftProject }) {
  const [requiresInput, setRequiresInput] = useState([]);
  const [hasCreatedProject, setHasCreateProject] = useState(false);

  const name = useRef();
  const description = useRef();
  const date = useRef();
  const form = useRef();

  const createProject = (event) => {
    event.preventDefault();
    let requiresInputTemp = [];
    if (name.current.value.length < 1) {
      requiresInputTemp.push("NAME");
    }
    if (description.current.value.length < 1) {
      requiresInputTemp.push("DESCRIPTION");
    }
    if (date.current.value.length < 1) {
      requiresInputTemp.push("DATE");
    }
    if (requiresInputTemp.length > 0) {
      setRequiresInput(requiresInputTemp);
      return;
    }
    setHasCreateProject(true);
    setTimeout(() => {
      onProjectCreate({
        name: name.current.value,
        description: description.current.value,
        date: date.current.value,
        savedTasks: [],
      });
    }, 300);
  };

  return (
    <form
      ref={form}
      className={`max-w-screen-sm ${useContext(ThemeContext) == 'light' ? "bg-white text-black" : "bg-[#202731] text-white" } w-screen pt-[60px] pb-5 ps-5 pe-5 rounded-b-3xl shadow flex flex-col justify-center items-center gap-3 animate-topMoveDown duration-[0.25s]  transition-all ${
        hasCreatedProject || hasLeftProject ? "-translate-y-full" : ""
      }`}
    >
      <h1 className={`font-bold text-4xl`}>
        Create Project{" "}
        <img className={`w-[20px] inline`} src={`src/assets/${useContext(ThemeContext) == 'light' ? "project.svg" : "project-white.svg" }`} alt="" />
      </h1>
      <input
        className={`${useContext(ThemeContext) == 'light' ? "bg-gray-200" : "bg-[#181F25] " }  outline-0 w-full max-w-sm rounded-3xl p-2 m-1 shadow ${
          requiresInput.includes("NAME")
            ? `border border-red-700 animate-shake`
            : ""
        }`}
        type="text"
        placeholder={`Insert project name`}
        ref={name}
      />
      <textarea
        className={`${useContext(ThemeContext) == 'light' ? "bg-gray-200" : "bg-[#181F25] "} outline-0 w-full h-24 max-w-sm rounded-3xl p-2 m-1 resize-none shadow ${
          requiresInput.includes("DESCRIPTION")
            ? `border border-red-700 animate-shake`
            : ""
        }`}
        placeholder={`Insert project description`}
        ref={description}
      />
      <input
        className={`${useContext(ThemeContext) == 'light' ? "bg-gray-200" : "bg-[#181F25] "} outline-0 w-full max-w-sm rounded-3xl p-2 m-1 shadow cursor-pointer ${
          requiresInput.includes("DATE")
            ? `border border-red-700 animate-shake`
            : ""
        }`}
        type="date"
        placeholder={`Insert project date`}
        ref={date}
      />
      <Button onClick={createProject} className="p-1 block">
        <p>Create Project</p>
      </Button>
    </form>
  );
}
