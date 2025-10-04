import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import React from 'react'
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";

function PrivateRote({children}: {children: React.ReactNode}){
  const name = localStorage.getItem('user_name')
  if (!name) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRote>
        <Dashboard />
      </PrivateRote>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
