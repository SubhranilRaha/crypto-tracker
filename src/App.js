import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./Components/Header";
import Homepage from './Pages/Homepage'
import Coinpage from './Pages/Coinpage'

function App() {
  return (
    <Router>
    <div>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/coins/:id" element={<Coinpage/>}/>
      </Routes>
    </div>
  </Router>
);
}

export default App;
