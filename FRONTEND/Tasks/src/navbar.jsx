import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

const Home = () => {
  return (
    <>
    <nav>
 
 
<Link to="/" className='link'>Home</Link>

  
    </nav>

  
    <Outlet/>
    </>
  );
};

export default Home;