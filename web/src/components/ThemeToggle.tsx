import { Moon, Sun } from "phosphor-react";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, setDarkTheme, setLightTheme } = useTheme();

  function handleToggle() {
    if (theme === 'light') {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }

  return (
    <button
      type="button"
      className="absolute right-5 bottom-3 bg-zinc-100 hover:bg-zinc-700 hover:text-white 
                 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 p-2 
                 rounded-full transition-colors"
      onClick={handleToggle}
    >
      { theme === 'light' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" /> }
    </button>
  )
}