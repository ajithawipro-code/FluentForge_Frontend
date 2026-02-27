import AppRoutes from "./routes/AppRoutes"
import Navbar from "@/components/Navbar"
import { Toaster } from "react-hot-toast"


function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
<Toaster
  position="top-center"
  containerStyle={{ top: 110 }}
  toastOptions={{
    style: {
      background: "#1f1f1f",
      color: "#fff",
      borderRadius: "12px",
      padding: "14px 18px",
    },
  }}
/>
      <AppRoutes />
    </div>
  )
}

export default App