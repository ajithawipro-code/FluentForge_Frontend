import { useEffect, useState, useContext } from "react"
import { api } from "../api/axios"
import { AuthContext } from "../context/AuthContext"
import XPChart from "@/components/XPChart"

export default function Analytics() {
  const { user } = useContext(AuthContext)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics")
        setData(res.data)
      } catch (err) {
        console.log(err.response?.data || err.message)
      }
    }

    fetchAnalytics()
  }, [])

  // ✅ Adaptive AI Insight Logic
  const getAdaptiveInsight = () => {
  if (!data) return ""

  const weeklyXp =
    data.timeline?.reduce((sum, d) => sum + d.xp, 0) || 0

  // Strong performance
  if (data.streak >= 7 && weeklyXp >= 50) {
    return "Excellent consistency. You are building advanced-level fluency."
  }

  // Completed many lessons
  if (data.lessonsCompleted >= 8) {
    return "You're progressing into higher complexity modules. Focus on refinement."
  }

  // Moderate activity
  if (data.streak >= 3) {
    return "Momentum is building. Stay consistent to unlock advanced mastery."
  }

  // Low weekly activity
  if (weeklyXp < 20) {
    return "Your weekly activity is low. Revisit beginner lessons to rebuild rhythm."
  }

  // Fallback
  return "Keep building daily fluency. Small consistent sessions compound over time."
}

  if (!data) return <div className="p-10">Loading...</div>

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-serif">
            Learning <span className="text-[#b89b3c]">Analytics</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            A deeper look at your learning performance.
          </p>
        </div>

        {/* 🔥 Adaptive Learning Insight */}
        <div className="bg-card border border-[#b89b3c]/40 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Adaptive Learning Insight
          </p>
          <p className="text-lg text-[#b89b3c]">
            {getAdaptiveInsight()}
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm text-muted-foreground">Total XP</p>
            <p className="text-3xl font-semibold text-[#b89b3c] mt-2">
              {data.totalXp}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm text-muted-foreground">Streak</p>
            <p className="text-3xl font-semibold text-[#b89b3c] mt-2">
              {data.streak} 🔥
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm text-muted-foreground">Lessons Completed</p>
            <p className="text-3xl font-semibold text-[#b89b3c] mt-2">
              {data.lessonsCompleted}
            </p>
          </div>

        </div>

        {/* CHART SECTION */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-serif mb-6">
            Weekly XP Progress
          </h2>

          <XPChart data={data.timeline} />
        </div>

      </div>
    </div>
  )
}