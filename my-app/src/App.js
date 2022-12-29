import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from "./components//PrivateRoute";
import Login from "./components//Login";
import SignUp from "./components/SignUp";
import Reset from "./components/Reset";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
 
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
        </div>
        <Routes>
          <Route index element={<><Navigation /><Landing/></>} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/reset" element={<Reset/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/dashboard" element={<><Navigation /><Dashboard/></>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
