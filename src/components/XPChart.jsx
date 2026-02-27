import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

export default function XPChart({ data }) {

  // 🔥 Always generate last 7 days
  const last7Days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    const formatted = date.toISOString().split("T")[0]

    const existing = data?.find(d => d.date === formatted)

    last7Days.push({
      date: formatted.slice(5), // MM-DD
      xp: existing ? existing.xp : 0
    })
  }

  return (
    <div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={last7Days} barCategoryGap="30%">

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2a2a2a"
          />

          <XAxis
            dataKey="date"
            stroke="#888"
            tick={{ fill: "#999", fontSize: 12 }}
          />

          <YAxis
            stroke="#888"
            tick={{ fill: "#999", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid #b89b3c",
              borderRadius: "10px"
            }}
          />

          <Bar
            dataKey="xp"
            radius={[8, 8, 0, 0]}
            fill="#b89b3c"
            barSize={22}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}