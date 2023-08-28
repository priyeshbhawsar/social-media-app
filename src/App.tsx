import React from 'react';
import Home from './components/home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from './components/sign-in/Signin';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

const App:React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
