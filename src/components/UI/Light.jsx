import {useContext} from 'react'
import {ThemeContext} from "../store/ThemeContext.jsx";
export default function Light({isSideBarOpen,onLightClick}) {
    return (
      <img
        src={`./${useContext(ThemeContext) == 'light' ? "turned-on-light.svg" : "turned-off-light.svg" }`}
        onClick={onLightClick}
        className={
          `sm:w-24 w-16 absolute top-0 ${isSideBarOpen ? "-translate-y-0" : "-translate-y-full" } right-5 rotate-180 z-50 transition-all duration-300`
        }
        alt=""
      />
    );
}