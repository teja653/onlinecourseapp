import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
export default function Navbar(){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <nav className='nav'>
      <div className='brand'>OCMS</div>
      <div className='links'>
        {user?.role === 'student' && <Link to='/student'>Student</Link>}
        {user?.role === 'instructor' && <Link to='/instructor'>Instructor</Link>}
        {user?.role === 'admin' && <Link to='/admin'>Admin</Link>}
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
