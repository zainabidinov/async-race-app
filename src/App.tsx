import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { CarProvider } from "./store/CarContext";
import Garage from "./pages/Garage";
import Winners from "./pages/Winners";

function App() {
  return (
    <CarProvider>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Navigate to='/garage' />} />
          <Route path='/garage' element={<Garage />} />
          <Route path='/winners' element={<Winners />} />
        </Routes>
      </div>
    </CarProvider>
  );
}

export default App;
