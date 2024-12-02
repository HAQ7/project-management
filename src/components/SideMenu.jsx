import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../store/ThemeContext.jsx";
import Light from "./UI/Light.jsx";

export default function SideMenu({
    projects,
    onProjectClick,
    onProjectCreateClick,
}) {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [search, setSearch] = useState("");
    let hasCheckWindowInStart = useRef(false);
    const listHeight = 3.75 * projects.length;
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
            setSideBarOpen(prevValue => !prevValue);
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
                className={`w-[60px] cursor-pointer absolute top-0 left-0 transition-all z-30 xl:hidden block ${
                    !sideBarOpen ? "opacity-0" : ""
                }`}
                src="./menu-x-black.svg"
                alt=""
                onClick={changeSideBarState}
            />
            <img
                className={`w-[60px] cursor-pointer absolute top-0 left-0 transition-all z-30 xl:hidden block ${
                    sideBarOpen ? "opacity-0" : ""
                }`}
                src={`./${
                    useContext(ThemeContext).theme == "light"
                        ? "menu-bars-black.svg"
                        : "menu-bars-white.svg"
                }`}
                alt=""
                onClick={changeSideBarState}
            />
            {/* /!*#19454B #00B9D2 ${useContext(ThemeContext) == 'light' ? "bg-gray-200" : "bg-[#181F25] "} */}

            <section
                className={`bg-gradient-to-b bg-white
          ${
              useContext(ThemeContext).theme == "light"
                  ? "from-[#19454B] to-[#00B9D2]"
                  : "from-[#202731] to-[#181F25] "
          }     
         w-72 ps-5 h-screen z-20 absolute top-0 rounded-e-3xl duration-300 text-white transition-all overflow-y-auto overflow-x-hidden ${
             sideBarOpen ? "" : "translate-x-[-100%]"
         } `}
            >
                <h2 className="font-bold text-3xl mt-[60px]">
                    <p>
                        <a href="./">
                            <img
                                src="./481-logo-nobg.svg"
                                className=""
                                alt=""
                            />
                        </a>
                    </p>
                    Projects{" "}
                    <img
                        className={`w-[20px] inline`}
                        src="./project-white.svg"
                        alt=""
                    />
                </h2>
                <input
                    onChange={e => {
                        setSearch(e.target.value);
                    }}
                    value={search}
                    className="w-[90%] mt-5 h-10 bg-[hsl(0,0%,89%)] shadow-xl rounded-lg ps-2"
                    placeholder="Enter project name"
                ></input>
                <ul
                    className={`mt-3 transition-all duration-200`}
                    style={{
                        height: `${listHeight}rem`,
                    }}
                >
                    {projects.map((project, index) => {
                        if (!project.name.includes(search) && search !== "") {
                            console.log("error");
                            return null;
                        }
                        return (
                            <li
                                onClick={() => {
                                    changeSideBarState();
                                    onProjectClick(index);
                                }}
                                key={index}
                                className={`font-medium cursor-pointer text-md rounded-3xl  grid place-items-center p-3 mt-2 w-fit max-w-[16rem] overflow-hidden shadow border border-white hover:bg-white hover:text-black  transition-colors duration-[0.200s] opacity-0 animate-opacityWithDelay`}
                            >
                                {project.name}
                            </li>
                        );
                    })}
                </ul>
                {projects.length === 0 && (
                    <div className="text-gray-500 my-10 grid place-items-center text-center mx-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-10"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                            />
                        </svg>
                        No projects found, Create a project below
                    </div>
                )}
                <button
                    onClick={() => {
                        changeSideBarState();
                        onProjectCreateClick(-1);
                    }}
                    className={`bg-[#38A7B6] text-white w-36 h-12 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer font-medium mt-3`}
                >
                    Create Project
                </button>
            </section>
            <Light isSideBarOpen={sideBarOpen} />
        </>
    );
}
