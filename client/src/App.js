import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'
import Error from './pages/error'
import Intranet from './pages/intranet'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/intranet" element={<Intranet />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
