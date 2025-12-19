import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
