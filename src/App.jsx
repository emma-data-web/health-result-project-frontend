import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/Landing/LandingPage";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Report from "./Pages/Report/Report";
import ProtectedRoute from "./Components/ProtectedRoute";
import Loader from "./Components/Loader"

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      
      <Route
        path="/report"
        element={
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
