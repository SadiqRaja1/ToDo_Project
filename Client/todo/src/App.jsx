import { useState } from 'react';
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import New from './Form/New';
import Show from "./view/Show";
import Edit from './Form/Edit';


function App() {

  return (
    <>
        <Routes>
          <Route path="/tasks" element={<New />} />
          <Route path="/" element={<Show />}/> 
          <Route path='/edit/:id' element={<Edit/>} />
        </Routes>
    </>
  )
}

export default App
