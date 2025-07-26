import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import 'animate.css';
import Browse from "./pages/Browse";
import Guard from "./components/Guard";
import Noroute from "./components/Noroute";
import Profile from "./pages/Profile";
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './pages/AdminRoute'; 
const App = () => {
  return (
    <>
    
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/sign-in" element={<Signin/>} />
          <Route element={<Guard/>}>
          <Route path="/browse" element={<Browse/>} />
          <Route path="/Profile" element={<Profile/>} />
          </Route>

          <Route path="*" element={<Noroute/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
