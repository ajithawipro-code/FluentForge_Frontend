import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const currentlyDark =
      document.documentElement.classList.contains("dark")

    if (currentlyDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
 <button
  onClick={toggleTheme}
  className="
    w-10 h-10
    flex items-center justify-center
    rounded-full
    border border-[#2a2a2c]
    text-[#b89b3c]
    hover:bg-[#b89b3c]
    hover:text-black
    transition-all duration-300
  "
>
  {isDark ? <Sun size={18} /> : <Moon size={18} />}
</button>
  )
}