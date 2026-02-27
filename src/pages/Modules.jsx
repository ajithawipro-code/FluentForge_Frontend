import { useEffect, useState } from "react"
import { api } from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Modules() {
  const [modules, setModules] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await api.get("/learning/modules")
        setModules(res.data.modules)
      } catch (err) {
        console.log(err.response?.data || err.message)
      }
    }

    fetchModules()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-12">

        <h1 className="text-4xl font-serif">
          Your <span className="text-[#b89b3c]">Modules</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {modules.map((module) => {

            const xpMap = { 1: 20, 2: 40, 3: 60 }
            const xp = xpMap[module.display_order] || 0

            return (
              <div
                key={module.id}
                onClick={() => {
                  if (!module.locked) {
                    navigate(`/modules/${module.id}`)
                  }
                }}
                className={`
                  bg-card border border-border rounded-3xl p-10 min-h-[360px]
                  flex flex-col justify-center items-center text-center
                  transition-all duration-300
                  ${module.locked
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:border-[#b89b3c]/40"}
                `}
              >

                {/* ICON */}
                <div className="text-2xl mb-6">
                  {module.locked ? "🔒" : "✨"}
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-serif">
                  {module.title}
                </h3>

                {/* XP */}
                <p className="text-sm text-[#b89b3c] mt-3 tracking-wide">
                  {xp} XP
                </p>

                {/* Description Pill */}
                <span className="px-4 py-2 text-sm 
                                 border border-[#b89b3c]/40 
                                 text-[#b89b3c] rounded-full mt-6">
                  {module.level}
                </span>

                {/* Lock Message */}
                {module.locked && (
                  <p className="text-sm text-muted-foreground mt-6">
                    Complete previous module to unlock
                  </p>
                )}

                {/* Progress */}
                {!module.locked && (
                  module.progress === 100 ? (
                    <p className="text-sm text-green-500 font-medium mt-10">
                      ✓ Completed
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-10">
                      {module.progress || 0}% completed
                    </p>
                  )
                )}

              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}