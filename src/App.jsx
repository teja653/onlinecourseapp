import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StudentSection from './components/StudentSection';
import InstructorSection from './components/InstructorSection';
import AdminSection from './components/AdminSection';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Navigate to='/login' />;
  if (role && user.role !== role) return <Navigate to={`/${user.role}`} />;
  return children;
};

export default function App(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div className='app'>
      {user && <Navbar />}
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/student' element={<PrivateRoute role='student'><StudentSection /></PrivateRoute>} />
        <Route path='/instructor' element={<PrivateRoute role='instructor'><InstructorSection /></PrivateRoute>} />
        <Route path='/admin' element={<PrivateRoute role='admin'><AdminSection /></PrivateRoute>} />
        <Route path='*' element={<h2>404 - Not found</h2>} />
      </Routes>
    </div>
  );
}
