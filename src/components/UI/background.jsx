import { useContext } from "react";
import { ThemeContext } from "../../store/ThemeContext";

export function Background({children}) {
    return (
        <section
        className={`${
            useContext(ThemeContext).theme == "light" ? "bg-[#dddddd]" : "bg-[#181F25]"
        }  w-screen h-screen transition`}
    >  {children}</section>
    );
}