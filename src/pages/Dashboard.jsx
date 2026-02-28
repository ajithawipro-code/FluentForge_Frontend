import { useState, useEffect, useContext } from "react"
import { api } from "@/api/axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const [modules, setModules] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  This already returns progress
        const modulesRes = await api.get("/learning/modules")
        setModules(modulesRes.data.modules)

        const dashboardRes = await api.get("/progress/dashboard")
        setDashboardData(dashboardRes.data)
      } catch (err) {
        console.log(err.response?.data || err.message)
      }
    }

    fetchData()
  }, []);

if (!modules || !dashboardData) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-5">
         <div className="text-5xl text-[#b89b3c] animate-pulse">
          📈
        </div>


        <p className="text-xl font-serif">
          Compiling your learning dashboard...
        </p>

        {/* <p className="text-sm text-muted-foreground">
          Excellence is being prepared.
        </p> */}

      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen px-6 py-12 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-serif">
            Welcome back,{" "}
            <span className="text-primary">
              {user?.name}
            </span>
          </h1>
        </div>

        {/* Top Stats */}
        {dashboardData && (
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-card border border-border rounded-full px-8 py-6 flex items-center justify-between shadow transition-all hover:border-primary">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Total XP
                </p>
                <p className="text-2xl font-semibold text-primary mt-1">
                  {dashboardData.gamification.totalXp} ⭐
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-full px-8 py-6 flex items-center justify-between shadow transition-all hover:border-primary">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Streak
                </p>
                <p className="text-2xl font-semibold text-primary mt-1">
                  {dashboardData.gamification.streak} 🔥
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-full px-8 py-6 flex items-center justify-between shadow transition-all hover:border-primary">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Completion
                </p>
                <p className="text-2xl font-semibold text-primary mt-1">
                  {dashboardData.overview.completionPercentage}% 🏆
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Module Cards */}
        <div className="grid lg:grid-cols-3 gap-10">
          {modules.map((module, index) => {

            const locked = index > 0 && modules[index - 1].progress < 100

            return (
              <Card
                key={module.id}
                onClick={() =>
                  !locked && navigate(`/modules/${module.id}`)
                }
                className={`bg-card border border-border hover:border-primary
                rounded-2xl min-h-[220px]
                shadow transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
                flex flex-col justify-between
                ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {module.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {!locked ? (
                    <>
                      <Progress value={module.progress} />
                      <p className="text-sm text-muted-foreground">
                        {module.progress}% completed
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      🔒 Complete previous module to continue your journey 🚀
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

      </div>
    </div>
  )
}