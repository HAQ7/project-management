import { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";
import Button from "./UI/Button";

export function EmptyProject({ hasGoneToCreate, changeActiveProject}) {
    return (
        <h1
            className={`font-bold mt-32 text-center ${
                useContext(ThemeContext).theme == "light"
                    ? "bg-white text-black"
                    : "bg-[#202731] text-white"
            }  shadow rounded-3xl p-2 grid place-items-center animate-bottomMoveUp duration-[0.25s] transition-all ${
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
    );
}
