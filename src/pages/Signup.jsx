import { useState } from "react"
import { api } from "../api/axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    try {
      setLoading(true)

      await api.post("/auth/signup", {
        name,
        email,
        password,
      })

      toast.success("Account created successfully")
      navigate("/login")
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-serif text-center mb-8">
          Create Account
        </h2>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-8">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-full font-semibold bg-primary text-background transition hover:opacity-90"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}