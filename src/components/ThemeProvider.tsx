import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType{
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children } : { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    useEffect(() => {
        const root = document.documentElement;
        if (theme ==="light") {
            root.classList.add("light");
            root.setAttribute("data-theme", "light");
        } else {
            root.classList.remove("light");
            root.setAttribute("data-theme", "dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"))
    }

    return (
        <ThemeContext.Provider  value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used inside ThemeProvider");
    return context;
}