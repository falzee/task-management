import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./routes/ProtectedRoutes";
import UserLayout from "./layout/UserLayout";

function App() {
  return (
    <>
      <Routes>
        {/* global */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* protected cuman home sama tasks */}
        <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
        {/* 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
