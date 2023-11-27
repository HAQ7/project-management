import { useRef, useState } from "react";

export default function SideMenu({
  projects,
  onProjectClick,
  onProjectCreateClick,
}) {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  let hasCheckWindowInStart = useRef(false);
  const listHeight =  3.75 * projects.length;
  const checkWindowSize = () => {
    if (window.innerWidth > 1280 && !sideBarOpen) {
      setSideBarOpen(true);
      return;
    }
    if (window.innerWidth < 1280 && sideBarOpen) setSideBarOpen(false);
  };
  window.addEventListener("resize", checkWindowSize);
  if (!hasCheckWindowInStart.current) {
    hasCheckWindowInStart.current = true;
    checkWindowSize();
  }

  const changeSideBarState = () => {
    if (window.innerWidth < 1280) {
      setSideBarOpen((prevValue) => !prevValue);
    }
  };

  return (
    <>
      <div
        className={`w-screen h-screen opacity-40 bg-black absolute transition-all z-10 xl:hidden block ${
          sideBarOpen ? "visible" : "hidden"
        }`}
      />
      <img
        className={`w-[60px] cursor-pointer absolute top-0 left-0 text-white transition-all z-30 xl:hidden block ${
          !sideBarOpen ? "opacity-0" : ""
        }`}
        src="./src/assets/menu-x.svg"
        alt=""
        onClick={changeSideBarState}
      />
      <img
        className={`w-[60px] cursor-pointer absolute top-0 left-0 text-white transition-all z-30 xl:hidden block ${
          sideBarOpen ? "opacity-0" : ""
        }`}
        src="./src/assets/menu-bars.svg"
        alt=""
        onClick={changeSideBarState}
      />
      <section
        className={`bg-gradient-to-b from-[#19454B] to-[#00B9D2] w-72 ps-5 h-screen z-20 absolute top-0 rounded-e-3xl text-white duration-300 transition-all overflow-y-auto overflow-x-hidden ${
          sideBarOpen ? "" : "translate-x-[-100%]"
        }`}
      >
        <h1 className="font-bold text-3xl mt-[60px]">
          Projects{" "}
          <img
            className={`w-[20px] inline`}
            src="./src/assets/projectWhite.svg"
            alt=""
          />
        </h1>
        <ul
          className={`mt-3 transition-all duration-200`}
          style={{
            height: `${listHeight}rem`,
          }}
        >
          {projects.map((project, index) => (
            <li
              onClick={() => {
                changeSideBarState();
                onProjectClick(index);
              }}
              key={index}
              className="font-medium cursor-pointer text-md rounded-3xl border border-white grid place-items-center p-3 mt-2 w-fit max-w-[16rem] overflow-hidden shadow hover:bg-white hover:text-black transition-colors duration-[0.200s] opacity-0 animate-opacityWithDelay"
            >
              {project.name}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            changeSideBarState();
            onProjectCreateClick(-1);
          }}
          className={
            "text-black bg-white w-36 h-12 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer font-medium mt-3"
          }
        >
          Create Project
        </button>
      </section>
    </>
  );
}
