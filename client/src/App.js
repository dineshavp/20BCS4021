import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterCompany from './Components/Auth/RegisterCompany';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterCompany/>}/> 
        
      </Routes>
    </BrowserRouter>
  );
}


export default App;