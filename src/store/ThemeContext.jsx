import {createContext} from "react";
import {useState} from "react";
export const ThemeContext = createContext('light');

export function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") === null
            ? "light"
            : localStorage.getItem("theme")
    );

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const ctxValue = {
        theme: theme,
        toggleTheme: toggleTheme
    }

    return (
        <ThemeContext.Provider value={ctxValue}>
            {children}
        </ThemeContext.Provider>
    );
}