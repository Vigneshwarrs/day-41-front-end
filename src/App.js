import Login from "./components/Login";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
