import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "@/api/axios"
import toast from "react-hot-toast"

export default function ModuleLessons() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const [lessons, setLessons] = useState(null)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get(`/learning/lessons/${moduleId}`)
        setLessons(res.data.data)
      } catch (err) {
        if (err.response?.status === 403) {
          toast.error("Module locked. Complete previous module first.")
          navigate("/modules")
        } else {
          toast.error("Something went wrong.")
        }
      }
    }

    fetchLessons()
  }, [moduleId, navigate]);

if (!lessons) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-5">

        <div className="text-5xl text-[#b89b3c] animate-pulse">
          🚀
        </div>

         <p className="text-xl font-serif">
          Preparing you lesson experience...
        </p>

      </div>
    </div>
  )
}

  return (
    <div className="bg-background min-h-screen px-6 py-20">

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif">
          Why Choose <span className="text-[#b89b3c]">FluentForge</span>
        </h2>

        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Structured mastery. Intelligent repetition. Measurable growth.
        </p>
      </div>

      {/* Lesson Grid */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            onClick={() => !lesson.locked && navigate(`/lessons/${lesson.id}`)}
            className={`bg-card border border-border rounded-2xl p-8 shadow-md
              transition-all duration-300
              hover:shadow-xl hover:-translate-y-2
              ${lesson.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className="w-10 h-10 rounded-full bg-[#b89b3c]/15 flex items-center justify-center mb-6">
              <span className="text-[#b89b3c] font-semibold">
                {index + 1}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">
              {lesson.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              {lesson.locked ? "Locked" : "Click to start"}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}