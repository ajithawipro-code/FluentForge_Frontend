import { Link, useNavigate, useLocation } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import ThemeToggle from "@/components/ThemeToggle"

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
    setMenuOpen(false)
  }

  return (
    <div className="bg-[#0f0f10] text-white px-6 py-4">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          Fluent<span className="text-[#b89b3c]">Forge</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm">

          <Link to="/" className="hover:text-[#b89b3c] transition">
            Home
          </Link>

          {user && (
            <Link to="/dashboard" className="hover:text-[#b89b3c] transition">
              Dashboard
            </Link>
          )}

          {user && (
            <Link to="/modules" className="hover:text-[#b89b3c] transition">
              Modules
            </Link>
          )}

          {user && (
            <Link to="/analytics" className="hover:text-[#b89b3c] transition">
              Analytics
            </Link>
          )}

          <ThemeToggle />

          {!user && location.pathname === "/" && (
            <Link
              to="/signup"
              className="bg-[#b89b3c] text-black px-4 py-2 rounded-full font-medium hover:opacity-90 transition"
            >
              Get Started
            </Link>
          )}

          {/* Avatar Desktop */}
          {user && (
            <div className="flex items-center gap-3 ml-4">

              <div className="w-8 h-8 rounded-full bg-[#b89b3c] flex items-center justify-center text-black font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <span className="text-sm">
                {user.name}
              </span>

              {/* <button
                onClick={handleLogout}
                className="ml-2 text-xs hover:text-[#b89b3c] transition"
              >
                Logout
              </button> */}
              <button
  onClick={handleLogout}
  className="ml-auto bg-[#b89b3c] text-black px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
>
  Logout
</button>

            </div>
          )}

        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {user && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {user && (
            <Link to="/modules" onClick={() => setMenuOpen(false)}>
              Modules
            </Link>
          )}

          {user && (
            <Link to="/analytics" onClick={() => setMenuOpen(false)}>
              Analytics
            </Link>
          )}

          <ThemeToggle />

          {!user && location.pathname === "/" && (
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="bg-[#b89b3c] text-black px-4 py-2 rounded-full font-medium"
            >
              Get Started
            </Link>
          )}

          {/* Avatar Mobile */}
          {user && (
            <div className="flex items-center gap-3 pt-2 border-t border-border">

              <div className="w-8 h-8 rounded-full bg-[#b89b3c] flex items-center justify-center text-black font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <span>{user.name}</span>

              {/* <button
                onClick={handleLogout}
                className="ml-auto text-xs hover:text-[#b89b3c]"
              >
                Logout
              </button> */}
              <button
  onClick={handleLogout}
  className="ml-3 bg-[#b89b3c] text-black px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
  Logout
</button>

            </div>
          )}

        </div>
      )}
    </div>
  )
}