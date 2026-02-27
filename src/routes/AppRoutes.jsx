import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ModuleLessons from "@/pages/ModuleLessons";
import Lesson from "../pages/Lesson";
import Landing from "../pages/Landing";
import Analytics from "@/pages/Analytics";
import ProtectedRoute from "../components/ProtectedRoute";
import Modules from "@/pages/Modules";
import Flashcards from "@/pages/Flashcards";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element = {<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      <Route path="/lessons/:id" element={<ProtectedRoute>
        <Lesson />
        </ProtectedRoute>} />
      <Route path="/modules" element={ <ProtectedRoute>
      <Modules />   
    </ProtectedRoute>
  }/>
    <Route path="/modules/:moduleId" element={<ProtectedRoute>
          <ModuleLessons /> 
        </ProtectedRoute>} />
        <Route
  path="/flashcards/:lessonId"  element={ <ProtectedRoute>
      <Flashcards />
    </ProtectedRoute>
  } />
   <Route path="/analytics"  element={<ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }/>
    </Routes>
  );
}