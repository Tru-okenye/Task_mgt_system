import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './List';
import EditForm from './edit';
import Home from './navbar';
import TaskForm from './taskform';
import './App.css';

const App = () => {
    return (
      <main>
        <Router>
        <Routes>
                <Route path="/" element={<Home/>} />
                <Route index element={<List/>} />
                <Route path='/tasks' element={<List/>} />
                <Route path="/tasks/:id/edit" element={<EditForm />} />
                <Route path="/add" element={<TaskForm />} />
                
        </Routes>
        
        </Router>

      </main>
    );
};

export default App;
