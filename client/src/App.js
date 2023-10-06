import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SharedLayout from './Components/Dashboard/SharedLayout';
import RegisterCompany from './Components/Auth/RegisterCompany';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterCompany/>}/> 
        {/* <Route path='/signup' element={<Signup/>}/>        
        <Route path='/dashboard' element={<SharedLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='test' element={<Tests/>}/>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;